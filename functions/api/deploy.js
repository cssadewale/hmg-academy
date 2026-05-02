/**
 * POST /api/deploy
 * JWT-protected. GitHub token lives ONLY in Cloudflare env vars.
 * After deploy, result is logged to hmg_deploy_history in Supabase.
 */

import { supabase } from './_middleware.js';

const ALLOWED_FILES = [
  'index.html','about.html','services.html','tools.html',
  'notes.html','register.html','contact.html',
  'sitemap.xml','robots.txt','_shared.css','_shared.js',
];

export async function onRequestPost(context) {
  const { request, env } = context;
  const { jwtPayload }   = context.data;

  if (!env.GITHUB_TOKEN || !env.GITHUB_USER || !env.GITHUB_REPO) {
    return json({ error: 'GitHub not configured. Set GITHUB_TOKEN, GITHUB_USER, GITHUB_REPO in Cloudflare environment.' }, 500);
  }

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { files=[], message='HMG Academy admin update', content={} } = body;
  const toDeploy = files.filter(f => ALLOWED_FILES.includes(f));
  if (!toDeploy.length) return json({ error: `No valid files. Allowed: ${ALLOWED_FILES.join(', ')}` }, 400);

  const branch  = env.GITHUB_BRANCH || 'main';
  const results = [];
  let pushed = 0, failed = 0;

  for (const filename of toDeploy) {
    try {
      const fileContent = content[filename] || generateContent(filename, env);
      const sha         = await getFileSHA(env, filename, branch);
      const encoded     = b64encode(fileContent);
      const ghBody      = { message: `${message} (${filename})`, content: encoded, branch };
      if (sha) ghBody.sha = sha;

      const res = await fetch(
        `https://api.github.com/repos/${env.GITHUB_USER}/${env.GITHUB_REPO}/contents/${filename}`,
        { method: 'PUT',
          headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          body: JSON.stringify(ghBody) }
      );

      if (res.ok) {
        const d = await res.json();
        results.push({ file: filename, status: 'ok', sha: d.content?.sha });
        pushed++;
      } else {
        const e = await res.json().catch(() => ({ message: res.statusText }));
        results.push({ file: filename, status: 'error', error: e.message });
        failed++;
      }
    } catch (e) {
      results.push({ file: filename, status: 'error', error: e.message });
      failed++;
    }
    await delay(350);
  }

  // Save deploy log to Supabase
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    try {
      await supabase(env, '/hmg_deploy_history', { method: 'POST', prefer: '',
        body: JSON.stringify({ files: toDeploy, message, pushed, failed, results }) });
      await supabase(env, '/hmg_audit_log', { method: 'POST', prefer: '',
        body: JSON.stringify({
          action: pushed > 0 ? 'deploy_success' : 'deploy_failed',
          category: 'deploy',
          detail: `${pushed} pushed, ${failed} failed · ${toDeploy.join(', ')} · sid:${jwtPayload.sid?.slice(0,8)}`,
        }) });
    } catch { /* non-critical */ }
  }

  return json({
    success: pushed > 0, pushed, failed, results,
    message: pushed > 0
      ? `${pushed} file(s) deployed. Cloudflare Pages rebuilding in ~30 seconds.`
      : 'All files failed. Check results for details.',
  });
}

async function getFileSHA(env, path, branch) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${env.GITHUB_USER}/${env.GITHUB_REPO}/contents/${path}?ref=${branch}`,
      { headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return d.sha || null;
  } catch { return null; }
}

function generateContent(filename, env) {
  if (filename === 'sitemap.xml') return getSitemap(env);
  if (filename === 'robots.txt')  return getRobots();
  return `<!-- ${filename} updated ${new Date().toISOString()} -->`;
}

function getSitemap(env) {
  const d = new Date().toISOString().slice(0,10);
  const base = 'https://hmgacademy.pages.dev';
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><lastmod>${d}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${base}/about.html</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${base}/services.html</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${base}/register.html</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
  <url><loc>${base}/contact.html</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
  <url><loc>${base}/tools.html</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.80</priority></url>
  <url><loc>${base}/notes.html</loc><lastmod>${d}</lastmod><changefreq>weekly</changefreq><priority>0.75</priority></url>
</urlset>`;
}

function getRobots() {
  return `User-agent: *\nAllow: /\nDisallow: /admin.html\nSitemap: https://hmgacademy.pages.dev/sitemap.xml\n\nUser-agent: AhrefsBot\nDisallow: /\nUser-agent: SemrushBot\nDisallow: /`;
}

function b64encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function json(body, status=200) {
  return new Response(JSON.stringify(body), { status,
    headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' } });
}
