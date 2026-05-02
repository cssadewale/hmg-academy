/**
 * POST /api/login
 * Accepts: { password: string }
 * Returns: { token: string, expiresAt: number } on success
 *          { error: string } on failure
 *
 * Required Cloudflare Environment Variables:
 *   ADMIN_PASSWORD_HASH — SHA-256 hex of the admin password
 *   JWT_SECRET          — Random 256-bit secret for signing JWTs
 *   SUPABASE_URL        — Your Supabase project URL
 *   SUPABASE_SERVICE_KEY — service_role key (NOT anon)
 *
 * Rate limiting: tracks attempts in Supabase. After 5 failures
 * within 10 minutes, blocks for 15 minutes.
 */

import { sha256, signJWT, supabase } from './_middleware.js';

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 10;
const LOCKOUT_MINUTES = 15;
const SESSION_HOURS = 8;

export async function onRequestPost(context) {
  const { request, env } = context;

  // ── Validate environment ─────────────────────────────────
  if (!env.ADMIN_PASSWORD_HASH || !env.JWT_SECRET) {
    return json({ error: 'Server not configured. Set ADMIN_PASSWORD_HASH and JWT_SECRET in Cloudflare environment.' }, 500);
  }

  // ── Parse body ───────────────────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const { password } = body;
  if (!password || typeof password !== 'string') {
    return json({ error: 'Password required' }, 400);
  }

  // ── Get caller fingerprint (for rate limiting) ───────────
  const ip = request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For')
    || 'unknown';

  // ── Rate limit check ─────────────────────────────────────
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    const lockout = await checkRateLimit(env, ip);
    if (lockout.blocked) {
      return json({
        error: `Too many failed attempts. Try again in ${lockout.minutesLeft} minute(s).`,
        retryAfter: lockout.retryAfter,
        locked: true,
      }, 429);
    }
  }

  // ── Verify password ──────────────────────────────────────
  const inputHash = await sha256(password);
  const isCorrect = timingSafeEqual(inputHash, env.ADMIN_PASSWORD_HASH.toLowerCase());

  if (!isCorrect) {
    // Record failed attempt
    if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
      await recordFailedAttempt(env, ip);
      await auditLog(env, 'login_failed', 'auth', `IP: ${ip}`);
    }
    // Always wait a consistent time to prevent timing attacks
    await delay(300);
    return json({ error: 'Incorrect password' }, 401);
  }

  // ── SUCCESS: clear rate limit, create session ────────────
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    await clearRateLimit(env, ip);
  }

  const sessionId = crypto.randomUUID();
  const expiresAt = Math.floor(Date.now() / 1000) + (SESSION_HOURS * 3600);

  const token = await signJWT(
    { role: 'admin', sid: sessionId, iss: 'hmg-academy' },
    env.JWT_SECRET,
    SESSION_HOURS * 3600
  );

  // Record session in Supabase
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    await createSession(env, sessionId, ip, expiresAt);
    await auditLog(env, 'login_success', 'auth', `IP: ${ip} · Session: ${sessionId.slice(0, 8)}`);
  }

  return json({
    token,
    expiresAt,
    sessionId,
    message: 'Authenticated successfully',
  });
}

// ── Rate Limiting ────────────────────────────────────────────
async function checkRateLimit(env, ip) {
  try {
    const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
    const rows = await supabase(env,
      `/hmg_login_attempts?ip_hash=eq.${await sha256(ip)}&created_at=gte.${windowStart}&select=id,created_at`,
      { method: 'GET', prefer: '' }
    );

    if (!rows || rows.length < MAX_ATTEMPTS) {
      return { blocked: false };
    }

    // Check if within lockout window
    const oldest = rows[rows.length - 1];
    const lockoutEnd = new Date(oldest.created_at).getTime() + LOCKOUT_MINUTES * 60 * 1000;
    const now = Date.now();

    if (now < lockoutEnd) {
      return {
        blocked: true,
        minutesLeft: Math.ceil((lockoutEnd - now) / 60000),
        retryAfter: Math.ceil((lockoutEnd - now) / 1000),
      };
    }

    // Lockout expired — clear old attempts
    await clearRateLimit(env, ip);
    return { blocked: false };
  } catch {
    // If rate limit check fails, allow login (fail open — don't lock out admin)
    return { blocked: false };
  }
}

async function recordFailedAttempt(env, ip) {
  try {
    await supabase(env, '/hmg_login_attempts', {
      method: 'POST',
      prefer: '',
      body: JSON.stringify({ ip_hash: await sha256(ip) }),
    });
  } catch { /* non-critical */ }
}

async function clearRateLimit(env, ip) {
  try {
    await supabase(env, `/hmg_login_attempts?ip_hash=eq.${await sha256(ip)}`, {
      method: 'DELETE',
      prefer: '',
    });
  } catch { /* non-critical */ }
}

// ── Session Management ───────────────────────────────────────
async function createSession(env, sessionId, ip, expiresAt) {
  try {
    await supabase(env, '/hmg_sessions', {
      method: 'POST',
      prefer: '',
      body: JSON.stringify({
        id: sessionId,
        ip_hash: await sha256(ip),
        expires_at: new Date(expiresAt * 1000).toISOString(),
        active: true,
      }),
    });
  } catch { /* non-critical */ }
}

// ── Audit Logging ────────────────────────────────────────────
async function auditLog(env, action, category, detail) {
  try {
    await supabase(env, '/hmg_audit_log', {
      method: 'POST',
      prefer: '',
      body: JSON.stringify({ action, category, detail }),
    });
  } catch { /* non-critical */ }
}

// ── Timing-safe string comparison ────────────────────────────
function timingSafeEqual(a, b) {
  if (a.length !== b.length) {
    // Still run comparison to avoid timing leak on length
    let diff = 0;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
    }
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
