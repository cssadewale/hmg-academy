(function(){
const cfg=window.HMG_SUPABASE||null; const ready=!!(cfg&&cfg.url&&cfg.anonKey&&!String(cfg.url).includes('YOUR_PROJECT_ID'));
function isLocal(){return ['localhost','127.0.0.1',''].includes(location.hostname)||location.search.includes('demo=1')}
function session(){try{return JSON.parse(localStorage.getItem('hmg_admin_session')||'null')}catch{return null}}
function block(){document.body.innerHTML=`<main class="section"><div class="container card pad" style="max-width:720px"><h1 class="h1">Restricted Area</h1><p class="lead">This area is for HMG Academy administrators only.</p><p class="muted">Login with the admin credentials configured in Supabase. If you are the site owner, configure Supabase Auth and CMS setup first.</p><p><a class="btn btn-primary" href="admin.html">Go to Admin Login</a> <a class="btn btn-ghost" href="index.html">Return Home</a></p></div></main>`;}
function check(){ if(!document.body.dataset.protected)return; if(ready && session()?.access_token) return; if(!ready && isLocal()) return; block(); }
document.addEventListener('DOMContentLoaded',check);
})();
