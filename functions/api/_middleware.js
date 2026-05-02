/**
 * HMG Academy — Cloudflare Pages Functions Middleware
 * Runs before every /api/* request EXCEPT /api/login
 * Validates JWT token from Authorization header
 * All secrets live in Cloudflare environment — never in source code
 */

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // ── CORS preflight ──────────────────────────────────────────
  if (request.method === 'OPTIONS') {
    return corsResponse(null, 204);
  }

  // ── Public routes (no auth needed) ─────────────────────────
  const publicPaths = ['/api/login', '/api/health'];
  if (publicPaths.some(p => url.pathname === p)) {
    const res = await next();
    return addCors(res);
  }

  // ── All other /api/* routes require valid JWT ───────────────
  const authHeader = request.headers.get('Authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return corsResponse({ error: 'Missing authorization header' }, 401);
  }

  const token = authHeader.slice(7);
  const payload = await verifyJWT(token, env.JWT_SECRET);

  if (!payload) {
    return corsResponse({ error: 'Invalid or expired token' }, 401);
  }

  // Attach decoded payload to context for downstream handlers
  context.data.jwtPayload = payload;

  const res = await next();
  return addCors(res);
}

// ── JWT Verification (HMAC-SHA256, Web Crypto API) ──────────
export async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, sigB64] = parts;
    const enc = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false, ['verify']
    );

    const data = enc.encode(`${headerB64}.${payloadB64}`);
    const sig = base64UrlDecode(sigB64);

    const valid = await crypto.subtle.verify('HMAC', key, sig, data);
    if (!valid) return null;

    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));

    // Check expiry
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    if (payload.role !== 'admin') return null;

    return payload;
  } catch {
    return null;
  }
}

// ── Sign a JWT ───────────────────────────────────────────────
export async function signJWT(payload, secret, expiresInSeconds = 28800) {
  const enc = new TextEncoder();
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  }));

  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );

  const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(`${header}.${body}`));
  const sig = base64UrlEncode(sigBuf);
  return `${header}.${body}.${sig}`;
}

// ── Supabase helper (uses service_role — server side only) ───
export async function supabase(env, path, opts = {}) {
  const url = `${env.SUPABASE_URL}/rest/v1${path}`;
  const res = await fetch(url, {
    ...opts,
    headers: {
      'apikey': env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': opts.prefer || 'return=representation',
      ...(opts.headers || {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

// ── SHA-256 hash utility ─────────────────────────────────────
export async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── CORS helpers ─────────────────────────────────────────────
function corsResponse(body, status = 200) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  return new Response(
    body ? JSON.stringify(body) : null,
    { status, headers }
  );
}

function addCors(res) {
  const newRes = new Response(res.body, res);
  newRes.headers.set('Access-Control-Allow-Origin', '*');
  newRes.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return newRes;
}

// ── Base64URL helpers ────────────────────────────────────────
function base64UrlEncode(data) {
  const str = typeof data === 'string' ? data : String.fromCharCode(...new Uint8Array(data));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from(raw, c => c.charCodeAt(0));
}
