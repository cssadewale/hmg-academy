/**
 * GET /api/health
 * Public — no auth required.
 * Used by admin.html to check if the API layer is reachable.
 */

export async function onRequestGet(context) {
  const { env } = context;

  const configured = {
    supabase: !!(env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY),
    github: !!(env.GITHUB_TOKEN && env.GITHUB_USER && env.GITHUB_REPO),
    jwt: !!env.JWT_SECRET,
    password: !!env.ADMIN_PASSWORD_HASH,
  };

  const allReady = Object.values(configured).every(Boolean);

  return new Response(JSON.stringify({
    ok: true,
    configured,
    ready: allReady,
    ts: new Date().toISOString(),
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
