(function(){
  const cfg=window.HMG_SUPABASE||null;
  const enabled=!!(cfg&&cfg.url&&cfg.anonKey&&!String(cfg.url).includes('YOUR_PROJECT_ID'));
  const LS_PAGES='hmg_cms_pages_local', LS_SETTINGS='hmg_cms_settings_local', LS_MEDIA='hmg_cms_media_local';
  const headers=(auth)=>({'apikey':cfg.anonKey,'Authorization':`Bearer ${cfg.anonKey}`,'Content-Type':'application/json'});
  const slugify=s=>(s||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'page';
  function currentSlug(){ const u=new URL(location.href); if(u.searchParams.get('slug')) return slugify(u.searchParams.get('slug')); let f=location.pathname.split('/').pop()||'index.html'; return f==='index.html'||f===''?'index':f.replace(/\.html$/,''); }
  async function api(path){ const r=await fetch(`${cfg.url}/rest/v1/${path}`,{headers:headers()}); if(!r.ok) throw new Error(await r.text()); return r.json(); }
  function localPages(){return JSON.parse(localStorage.getItem(LS_PAGES)||'[]')} function localSettings(){return JSON.parse(localStorage.getItem(LS_SETTINGS)||'{}')}
  async function getSettings(){ if(!enabled) return localSettings(); try{ const rows=await api('hmg_cms_settings?select=key,value'); const o={}; rows.forEach(r=>o[r.key]=r.value); return o; }catch(e){console.warn('CMS settings failed',e); return localSettings();}}
  async function getPages(){ if(!enabled) return localPages(); try{return await api('hmg_cms_pages?select=*&order=nav_order.asc');}catch(e){console.warn('CMS pages failed',e); return localPages();}}
  function pageUrl(p){ return ['index','about','services','tutors','tools','lms','contact','book-tutor','courses','dashboard','resources'].includes(p.slug)?`${p.slug==='index'?'index':p.slug}.html`:`page.html?slug=${encodeURIComponent(p.slug)}`; }
  function applySettings(s){
    const site=s.site||{}, media=s.media||{}, announcement=s.announcement||{};
    if(site.titleSuffix && !document.title.includes(site.titleSuffix)) document.title += ' — '+site.titleSuffix;
    if(announcement.enabled && announcement.text && !document.querySelector('.cms-announcement')){ const div=document.createElement('div'); div.className='cms-announcement'; div.innerHTML=announcement.link?`<a href="${announcement.link}">${announcement.text}</a>`:announcement.text; document.body.prepend(div); }
    if(site.primaryWhatsApp){ document.querySelectorAll('a[href*="wa.me/2348100866322"],a[data-wa]').forEach(a=>{ if(a.dataset.wa){a.href=`https://wa.me/${site.primaryWhatsApp}?text=${encodeURIComponent(a.dataset.wa)}`;} else {a.href=a.href.replace(/wa\.me\/\d+/,`wa.me/${site.primaryWhatsApp}`);} }); }
    if(media.logoUrl) document.querySelectorAll('img[src*="hmg-academy-logo"]').forEach(img=>img.src=media.logoUrl);
    if(media.founderHeroUrl) document.querySelectorAll('img[src*="founder-hero-ai-developer"]').forEach(img=>img.src=media.founderHeroUrl);
    if(media.founderProfileUrl) document.querySelectorAll('img[src*="founder-profile-office"],img[src*="founder.jpg"]').forEach(img=>img.src=media.founderProfileUrl);
    if(site.brandName) document.querySelectorAll('.brand strong').forEach(el=>el.textContent=site.brandName);
  }
  function applyNav(pages){ const navPages=pages.filter(p=>p.show_in_nav && p.status==='published').sort((a,b)=>(a.nav_order||999)-(b.nav_order||999)); if(!navPages.length)return; const targets=[document.querySelector('.links'),document.querySelector('#mobileMenu')].filter(Boolean); targets.forEach(t=>{ navPages.forEach(p=>{ const href=pageUrl(p); if(t.querySelector(`a[href="${href}"]`))return; const a=document.createElement('a'); a.href=href; a.textContent=p.nav_label||p.title; t.appendChild(a); }); }); }
  function applyMeta(p){ if(p.title) document.title=p.title+' — HMG Academy'; let m=document.querySelector('meta[name="description"]'); if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)} if(p.seo_description)m.content=p.seo_description; }
  function renderPage(p,slug){ const main=document.querySelector('main'); if(!main)return; if(p.status==='deleted'||p.status==='draft'){ main.outerHTML=`<main class="cms-unavailable"><div class="container"><h1 class="h1">Page not available</h1><p class="lead">This page has been unpublished by HMG Academy.</p><a class="btn btn-primary" href="index.html">Return home</a></div></main>`; return; } if(p.content_html){ applyMeta(p); main.outerHTML=`<main class="cms-page-wrap"><div class="container cms-page-content">${p.hero_image?`<img src="${p.hero_image}" alt="${p.title||slug}">`:''}${p.content_html}</div></main>`; } }
  async function boot(){ if(location.pathname.endsWith('/admin.html')) return; const [settings,pages]=await Promise.all([getSettings(),getPages()]); applySettings(settings); applyNav(pages); const slug=currentSlug(); const page=pages.find(p=>p.slug===slug); if(page) renderPage(page,slug); else if(location.pathname.endsWith('/page.html')){ const main=document.querySelector('main'); if(main) main.outerHTML=`<main class="cms-unavailable"><div class="container"><h1 class="h1">Page not found</h1><p class="lead">The requested CMS page does not exist or has not been published.</p><a class="btn btn-primary" href="index.html">Return home</a></div></main>`; } }
  document.addEventListener('DOMContentLoaded',boot);
  window.HMGCMSPublic={enabled,getPages,getSettings,currentSlug,pageUrl};
})();
