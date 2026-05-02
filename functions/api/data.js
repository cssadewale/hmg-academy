/**
 * /api/data — HMG Academy CMS API v4
 * JWT verified by _middleware.js before this runs.
 */
import { supabase, sha256 } from './_middleware.js';

export async function onRequest(context) {
  const { request, env } = context;
  const { jwtPayload } = context.data;
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const action = url.searchParams.get('action');

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY)
    return j({ error: 'Supabase not configured' }, 500);

  try {
    if (request.method === 'GET') {
      if (type === 'config')         return getConfig(env);
      if (type === 'sessions')       return getSessions(env);
      if (type === 'audit')          return getAudit(env, url);
      if (type === 'announcements')  return getAnnouncements(env);
      if (type === 'registrations')  return getRegistrations(env, url);
      if (type === 'backups')        return getBackups(env);
      if (type === 'notepad')        return getNotepad(env);
      if (type === 'deploy_history') return getDeployHistory(env);
      if (type === 'calendar')       return getCalendar(env, url);
      if (type === 'site_config')    return getSiteConfig(env);
      if (type === 'enquiries')      return getEnquiries(env, url);
      if (type === 'stats')          return getStats(env);
      return j({ error: 'Unknown type' }, 400);
    }

    if (request.method === 'DELETE') {
      const id = url.searchParams.get('id');
      if (action === 'del_note')           return delArr(env, 'notes',       parseInt(id), jwtPayload);
      if (action === 'del_tool')           return delArr(env, 'tools',       parseInt(id), jwtPayload);
      if (action === 'del_testi')          return delArr(env, 'testi',       parseInt(id), jwtPayload);
      if (action === 'del_wa')             return delArr(env, 'waTemplates', parseInt(id), jwtPayload);
      if (action === 'del_announcement')   return delAnnouncement(env, id, jwtPayload);
      if (action === 'del_backup')         return delBackup(env, parseInt(id), jwtPayload);
      if (action === 'del_calendar')       return delCalendar(env, id, jwtPayload);
      if (action === 'del_enquiry')        return delEnquiry(env, id, jwtPayload);
      return j({ error: 'Unknown action' }, 400);
    }

    if (request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return j({ error: 'Invalid JSON' }, 400); }

      if (action === 'add_note')             return addArr(env, 'notes', body, jwtPayload);
      if (action === 'update_note')          return updArr(env, 'notes', body, jwtPayload);
      if (action === 'add_tool')             return addArr(env, 'tools', body, jwtPayload);
      if (action === 'update_tool')          return updArr(env, 'tools', body, jwtPayload);
      if (action === 'reorder_tools')        return reorderTools(env, body, jwtPayload);
      if (action === 'add_testi')            return addArr(env, 'testi', body, jwtPayload);
      if (action === 'add_wa')               return addArr(env, 'waTemplates', body, jwtPayload);
      if (action === 'save_config')          return saveConfig(env, body, jwtPayload);
      if (action === 'save_site_config')     return saveSiteConfig(env, body, jwtPayload);
      if (action === 'save_announcement')    return saveAnnouncement(env, body, jwtPayload);
      if (action === 'toggle_announcement')  return toggleAnnouncement(env, body, jwtPayload);
      if (action === 'add_registration')     return addRegistration(env, body, jwtPayload);
      if (action === 'update_registration')  return updateRegistration(env, body, jwtPayload);
      if (action === 'save_notepad')         return saveNotepad(env, body, jwtPayload);
      if (action === 'create_backup')        return createBackup(env, body, jwtPayload);
      if (action === 'restore_backup')       return restoreBackup(env, body, jwtPayload);
      if (action === 'change_pw')            return changePassword(env, body, jwtPayload, request);
      if (action === 'revoke_sessions')      return revokeSessions(env, jwtPayload);
      if (action === 'save_deploy_log')      return saveDeployLog(env, body, jwtPayload);
      if (action === 'add_calendar')         return addCalendar(env, body, jwtPayload);
      if (action === 'update_calendar')      return updateCalendar(env, body, jwtPayload);
      if (action === 'add_enquiry')          return addEnquiry(env, body, jwtPayload);
      if (action === 'mark_enquiry_read')    return markEnquiryRead(env, body, jwtPayload);
      if (action === 'bulk_notes_status')    return bulkNotesStatus(env, body, jwtPayload);
      return j({ error: 'Unknown action' }, 400);
    }

    return j({ error: 'Method not allowed' }, 405);
  } catch (err) {
    await log(env, 'api_error', 'system', err.message.slice(0,200));
    return j({ error: 'Server error', detail: err.message }, 500);
  }
}

// ── Config ──────────────────────────────────────────────────
async function getConfig(env) {
  const rows = await sb(env, '/hmg_admin_config?id=eq.singleton', 'GET');
  if (!rows?.length) return j({ data: defaults(), seeded: false });
  const r = rows[0];
  return j({ data: { notes:r.notes||[], tools:r.tools||[], testi:r.testi||[], waTemplates:r.wa_templates||[], uploads:r.uploads||[], settings:r.settings||{} }, seeded:true, updatedAt:r.updated_at });
}

async function saveConfig(env, body, jwt) {
  const map = { notes:'notes', tools:'tools', testi:'testi', waTemplates:'wa_templates', uploads:'uploads', settings:'settings' };
  const p = { updated_at: now() };
  for (const [k,c] of Object.entries(map)) if (body[k]!==undefined) p[c]=body[k];
  await patch(env, p);
  await log(env, 'config_saved', 'content', `sid:${jwt.sid?.slice(0,8)}`);
  return j({ success:true });
}

async function patch(env, payload) {
  await sb(env, '/hmg_admin_config?id=eq.singleton', 'PATCH', payload);
}

async function getRow(env, cols) {
  const rows = await sb(env, `/hmg_admin_config?id=eq.singleton&select=${cols}`, 'GET');
  return rows?.[0] || {};
}

// ── Site Config ─────────────────────────────────────────────
async function getSiteConfig(env) {
  const rows = await sb(env, '/hmg_site_config?id=eq.singleton', 'GET');
  return j({ config: rows?.[0] || {} });
}

async function saveSiteConfig(env, body, jwt) {
  const allowed = ['hero','contact','seo','stats','footer','social'];
  const p = { updated_at: now() };
  for (const k of allowed) if (body[k]!==undefined) p[k]=body[k];
  await sb(env, '/hmg_site_config?id=eq.singleton', 'PATCH', p);
  await log(env, 'site_config_saved', 'content', Object.keys(p).filter(k=>k!=='updated_at').join(','));
  return j({ success:true });
}

// ── Stats ───────────────────────────────────────────────────
async function getStats(env) {
  const [cfg, anns, regs, enq, bk, dh] = await Promise.allSettled([
    sb(env, '/hmg_admin_config?id=eq.singleton&select=notes,tools,testi,wa_templates', 'GET'),
    sb(env, '/hmg_announcements?select=id,active', 'GET'),
    sb(env, '/hmg_registrations?select=id,status', 'GET'),
    sb(env, '/hmg_enquiries_cache?select=id,read', 'GET'),
    sb(env, '/hmg_backup_history?select=id,created_at&order=created_at.desc&limit=1', 'GET'),
    sb(env, '/hmg_deploy_history?select=id,created_at&order=created_at.desc&limit=1', 'GET'),
  ]);
  const c = cfg.value?.[0] || {};
  const r = regs.value || [];
  const e = enq.value || [];
  return j({
    notes:          (c.notes||[]).length,
    tools:          (c.tools||[]).length,
    testi:          (c.testi||[]).length,
    waTemplates:    (c.wa_templates||[]).length,
    announcements:  (anns.value||[]).length,
    activeAnn:      (anns.value||[]).filter(a=>a.active).length,
    registrations:  r.length,
    pendingRegs:    r.filter(x=>x.status==='pending').length,
    enquiries:      e.length,
    unreadEnquiries:e.filter(x=>!x.read).length,
    lastBackup:     bk.value?.[0]?.created_at||null,
    lastDeploy:     dh.value?.[0]?.created_at||null,
  });
}

// ── Array items ─────────────────────────────────────────────
const COL = { notes:'notes', tools:'tools', testi:'testi', waTemplates:'wa_templates' };
const REQ = { notes:['title','subject','cls'], tools:['name','cat'], testi:['txt','name'], waTemplates:['name','body'] };

async function addArr(env, field, item, jwt) {
  for (const r of REQ[field]||[]) if (!item[r]) return j({ error:`Missing: ${r}` }, 400);
  const clean = { ...san(item), added: now() };
  const row = await getRow(env, COL[field]);
  const arr = [...(row[COL[field]]||[]), clean];
  await patch(env, { [COL[field]]:arr, updated_at:now() });
  await log(env, `${field}_added`, 'content', clean.title||clean.name||clean.txt?.slice(0,40));
  return j({ success:true, item:clean, index:arr.length-1 });
}

async function delArr(env, field, idx, jwt) {
  if (isNaN(idx)||idx<0) return j({ error:'Invalid index' }, 400);
  const row = await getRow(env, COL[field]);
  const arr = row[COL[field]] || [];
  if (idx>=arr.length) return j({ error:'Index out of range' }, 400);
  const del = arr.splice(idx,1)[0];
  await patch(env, { [COL[field]]:arr, updated_at:now() });
  await log(env, `${field}_deleted`, 'content', del?.title||del?.name||`idx:${idx}`);
  return j({ success:true });
}

async function updArr(env, field, body, jwt) {
  const { index:idx, data } = body;
  if (idx===undefined||!data) return j({ error:'index and data required' }, 400);
  const row = await getRow(env, COL[field]);
  const arr = row[COL[field]] || [];
  if (idx>=arr.length) return j({ error:'Index out of range' }, 400);
  arr[idx] = { ...arr[idx], ...san(data), updated:now() };
  await patch(env, { [COL[field]]:arr, updated_at:now() });
  await log(env, `${field}_updated`, 'content', `idx:${idx}`);
  return j({ success:true, item:arr[idx] });
}

async function reorderTools(env, body, jwt) {
  if (!Array.isArray(body.order)) return j({ error:'order array required' }, 400);
  const row = await getRow(env, 'tools');
  const reordered = body.order.map(i=>(row.tools||[])[i]).filter(Boolean);
  await patch(env, { tools:reordered, updated_at:now() });
  await log(env, 'tools_reordered', 'content', '');
  return j({ success:true });
}

async function bulkNotesStatus(env, body, jwt) {
  const { status } = body;
  if (!['published','draft'].includes(status)) return j({ error:'Invalid status' }, 400);
  const row = await getRow(env, 'notes');
  const arr = (row.notes||[]).map(n=>({...n,status}));
  await patch(env, { notes:arr, updated_at:now() });
  await log(env, 'notes_bulk_status', 'content', `all → ${status}`);
  return j({ success:true });
}

// ── Announcements ───────────────────────────────────────────
async function getAnnouncements(env) {
  const rows = await sb(env, '/hmg_announcements?order=created_at.desc&limit=50', 'GET');
  return j({ announcements:rows||[] });
}

async function saveAnnouncement(env, body, jwt) {
  if (!body.text) return j({ error:'text required' }, 400);
  await sb(env, '/hmg_announcements', 'POST', { text:s(body.text), btn_text:s(body.btn_text||''), btn_link:s(body.btn_link||''), theme:body.theme||'gold', active:!!body.active });
  await log(env, 'announcement_saved', 'content', body.text.slice(0,60));
  return j({ success:true });
}

async function toggleAnnouncement(env, body, jwt) {
  if (!body.id) return j({ error:'id required' }, 400);
  if (body.active) await sb(env, '/hmg_announcements?active=eq.true', 'PATCH', { active:false });
  await sb(env, `/hmg_announcements?id=eq.${body.id}`, 'PATCH', { active:!!body.active });
  await log(env, 'announcement_toggled', 'content', `id:${body.id} active:${body.active}`);
  return j({ success:true });
}

async function delAnnouncement(env, id, jwt) {
  if (!id) return j({ error:'id required' }, 400);
  await sb(env, `/hmg_announcements?id=eq.${id}`, 'DELETE');
  await log(env, 'announcement_deleted', 'content', `id:${id}`);
  return j({ success:true });
}

// ── Registrations ───────────────────────────────────────────
async function getRegistrations(env, url) {
  const status = url.searchParams.get('status');
  let path = '/hmg_registrations?order=created_at.desc&limit=200';
  if (status) path += `&status=eq.${status}`;
  const rows = await sb(env, path, 'GET');
  return j({ registrations:rows||[] });
}

async function addRegistration(env, body, jwt) {
  if (!body.name||!body.exam_type) return j({ error:'name and exam_type required' }, 400);
  await sb(env, '/hmg_registrations', 'POST', { name:s(body.name), phone:s(body.phone||''), exam_type:body.exam_type, school:s(body.school||''), notes:s(body.notes||''), status:'pending' });
  await log(env, 'registration_added', 'content', `${body.name} — ${body.exam_type}`);
  return j({ success:true });
}

async function updateRegistration(env, body, jwt) {
  if (!body.id) return j({ error:'id required' }, 400);
  const p = {};
  if (body.status) p.status = body.status;
  if (body.notes!==undefined) p.notes = s(body.notes);
  await sb(env, `/hmg_registrations?id=eq.${body.id}`, 'PATCH', p);
  await log(env, 'registration_updated', 'content', `id:${body.id} → ${body.status}`);
  return j({ success:true });
}

// ── Calendar ────────────────────────────────────────────────
async function getCalendar(env, url) {
  const month = url.searchParams.get('month'); // YYYY-MM
  let path = '/hmg_calendar?order=event_date.asc&limit=200';
  if (month) {
    const nxt = new Date(month+'-01'); nxt.setMonth(nxt.getMonth()+1);
    path += `&event_date=gte.${month}-01&event_date=lt.${nxt.toISOString().slice(0,10)}`;
  }
  const rows = await sb(env, path, 'GET');
  return j({ events:rows||[] });
}

async function addCalendar(env, body, jwt) {
  if (!body.title||!body.event_date) return j({ error:'title and event_date required' }, 400);
  await sb(env, '/hmg_calendar', 'POST', { title:s(body.title), description:s(body.description||''), event_date:body.event_date, event_type:body.event_type||'content', color:body.color||'gold', done:false });
  await log(env, 'calendar_added', 'content', `${body.title} on ${body.event_date}`);
  return j({ success:true });
}

async function updateCalendar(env, body, jwt) {
  if (!body.id) return j({ error:'id required' }, 400);
  const p = {};
  if (body.done!==undefined) p.done=body.done;
  if (body.title) p.title=s(body.title);
  if (body.event_date) p.event_date=body.event_date;
  await sb(env, `/hmg_calendar?id=eq.${body.id}`, 'PATCH', p);
  await log(env, 'calendar_updated', 'content', `id:${body.id}`);
  return j({ success:true });
}

async function delCalendar(env, id, jwt) {
  if (!id) return j({ error:'id required' }, 400);
  await sb(env, `/hmg_calendar?id=eq.${id}`, 'DELETE');
  await log(env, 'calendar_deleted', 'content', `id:${id}`);
  return j({ success:true });
}

// ── Enquiries ───────────────────────────────────────────────
async function getEnquiries(env, url) {
  const unread = url.searchParams.get('unread');
  let path = '/hmg_enquiries_cache?order=submitted_at.desc&limit=100';
  if (unread==='true') path += '&read=eq.false';
  const rows = await sb(env, path, 'GET');
  return j({ enquiries:rows||[] });
}

async function addEnquiry(env, body, jwt) {
  if (!body.submitter||!body.message) return j({ error:'submitter and message required' }, 400);
  await sb(env, '/hmg_enquiries_cache', 'POST', { submitter:s(body.submitter), email:s(body.email||''), message:s(body.message), phone:s(body.phone||''), subject:s(body.subject||''), read:false, source:'manual' });
  await log(env, 'enquiry_added', 'content', `from:${body.submitter}`);
  return j({ success:true });
}

async function markEnquiryRead(env, body, jwt) {
  if (!body.id) return j({ error:'id required' }, 400);
  await sb(env, `/hmg_enquiries_cache?id=eq.${body.id}`, 'PATCH', { read:body.read!==false });
  return j({ success:true });
}

async function delEnquiry(env, id, jwt) {
  if (!id) return j({ error:'id required' }, 400);
  await sb(env, `/hmg_enquiries_cache?id=eq.${id}`, 'DELETE');
  await log(env, 'enquiry_deleted', 'content', `id:${id}`);
  return j({ success:true });
}

// ── Notepad ─────────────────────────────────────────────────
async function getNotepad(env) {
  const rows = await sb(env, '/hmg_admin_notepad?id=eq.singleton', 'GET');
  return j({ content:rows?.[0]?.content||'', updatedAt:rows?.[0]?.updated_at||null });
}

async function saveNotepad(env, body, jwt) {
  await sb(env, '/hmg_admin_notepad?id=eq.singleton', 'PATCH', { content:(body.content||'').slice(0,10000), updated_at:now() });
  return j({ success:true });
}

// ── Backup ──────────────────────────────────────────────────
async function getBackups(env) {
  const rows = await sb(env, '/hmg_backup_history?order=created_at.desc&limit=20', 'GET');
  return j({ backups:rows||[] });
}

async function createBackup(env, body, jwt) {
  const rows = await sb(env, '/hmg_admin_config?id=eq.singleton', 'GET');
  const snap = { ...rows?.[0] }; delete snap.id;
  await sb(env, '/hmg_backup_history', 'POST', { label:s(body.label||`Backup ${new Date().toLocaleString('en-GB')}`), snapshot:snap });
  await log(env, 'backup_created', 'system', body.label||'manual');
  return j({ success:true });
}

async function restoreBackup(env, body, jwt) {
  if (!body.id) return j({ error:'id required' }, 400);
  const rows = await sb(env, `/hmg_backup_history?id=eq.${body.id}`, 'GET');
  if (!rows?.length) return j({ error:'Backup not found' }, 404);
  await patch(env, { ...rows[0].snapshot, updated_at:now() });
  await log(env, 'backup_restored', 'security', `"${rows[0].label}"`);
  return j({ success:true });
}

async function delBackup(env, idx, jwt) {
  const rows = await sb(env, '/hmg_backup_history?order=created_at.desc&limit=20', 'GET');
  if (!rows?.[idx]) return j({ error:'Not found' }, 404);
  await sb(env, `/hmg_backup_history?id=eq.${rows[idx].id}`, 'DELETE');
  await log(env, 'backup_deleted', 'system', `id:${rows[idx].id}`);
  return j({ success:true });
}

// ── Deploy history ───────────────────────────────────────────
async function getDeployHistory(env) {
  const rows = await sb(env, '/hmg_deploy_history?order=created_at.desc&limit=30', 'GET');
  return j({ deploys:rows||[] });
}

async function saveDeployLog(env, body, jwt) {
  await sb(env, '/hmg_deploy_history', 'POST', { files:body.files, message:body.message, pushed:body.pushed, failed:body.failed, results:body.results });
  return j({ success:true });
}

// ── Sessions & Audit ────────────────────────────────────────
async function getSessions(env) {
  const rows = await sb(env, '/hmg_sessions?order=created_at.desc&limit=50', 'GET');
  return j({ sessions:rows||[] });
}

async function revokeSessions(env, jwt) {
  await sb(env, '/hmg_sessions?active=eq.true', 'PATCH', { active:false });
  await log(env, 'sessions_revoked', 'security', `by:${jwt.sid?.slice(0,8)}`);
  return j({ success:true });
}

async function getAudit(env, url) {
  const limit    = Math.min(parseInt(url.searchParams.get('limit')||'100'), 200);
  const page     = parseInt(url.searchParams.get('page')||'0');
  const category = url.searchParams.get('category');
  const search   = url.searchParams.get('search');
  let path = `/hmg_audit_log?order=created_at.desc&limit=${limit}&offset=${page*limit}`;
  if (category) path += `&category=eq.${category}`;
  if (search)   path += `&action=ilike.*${encodeURIComponent(search)}*`;
  const rows = await sb(env, path, 'GET');
  return j({ events:rows||[], page, limit });
}

// ── Change password ─────────────────────────────────────────
async function changePassword(env, body, jwt, request) {
  if (!body.currentPassword||!body.newPassword) return j({ error:'Both passwords required' }, 400);
  if (body.newPassword.length < 10) return j({ error:'Min 10 characters' }, 400);
  const inputHash = await sha256(body.currentPassword);
  if (!tse(inputHash, env.ADMIN_PASSWORD_HASH?.toLowerCase()||'')) {
    await log(env, 'pw_change_failed', 'security', `IP:${request.headers.get('CF-Connecting-IP')||'?'}`);
    return j({ error:'Current password is incorrect' }, 401);
  }
  const newHash = await sha256(body.newPassword);
  const row = await getRow(env, 'settings');
  await patch(env, { settings:{ ...(row.settings||{}), pendingPwHash:newHash, pwChangedAt:now() }, updated_at:now() });
  await log(env, 'password_changed', 'security', `hash:${newHash.slice(0,12)}...`);
  return j({ success:true, newHash, message:'Updated in Supabase. Also update ADMIN_PASSWORD_HASH in Cloudflare env vars.' });
}

// ── Helpers ─────────────────────────────────────────────────
async function sb(env, path, method, body) {
  return supabase(env, path, { method, body: body ? JSON.stringify(body) : undefined });
}

async function log(env, action, category, detail) {
  try { await sb(env, '/hmg_audit_log', 'POST', { action, category, detail:detail||'' }); } catch {}
}

function san(obj) {
  const out = {};
  for (const [k,v] of Object.entries(obj)) out[k] = typeof v==='string'?s(v):v;
  return out;
}
function s(x) {
  return String(x).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi,'').replace(/javascript:/gi,'').replace(/on\w+\s*=/gi,'');
}
function tse(a,b) {
  let d = a.length===b.length?0:1;
  for (let i=0;i<Math.max(a.length,b.length);i++) d |= (a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);
  return d===0;
}
function now() { return new Date().toISOString(); }
function defaults() { return { notes:[], tools:[], testi:[], waTemplates:[], uploads:[], settings:{} }; }
function j(body, status=200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type':'application/json','Access-Control-Allow-Origin':'*' } });
}
