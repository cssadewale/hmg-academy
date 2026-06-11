(function(){
  const $=s=>document.querySelector(s);
  const $$=s=>[...document.querySelectorAll(s)];
  const cfg=window.HMG_SUPABASE||null;
  const supabaseReady=!!(cfg&&cfg.url&&cfg.anonKey&&!String(cfg.url).includes('YOUR_PROJECT_ID'));
  const keys=['hmg_cms_pages_local','hmg_cms_settings_local','hmg_cms_media_local','hmg_cms_audit_local','hmg_saved_tutors','hmg_compare_tutors','hmg_last_assessment','hmg_dashboard_students','hmg_study_desk','hmg_course_enrolments','hmg_assignments','hmg_attendance','hmg_certificate_records','hmg_support_tickets'];
  function bytes(s){return new Blob([s||'']).size}
  function fmt(n){return n>1024*1024?(n/1024/1024).toFixed(2)+' MB':n>1024?(n/1024).toFixed(1)+' KB':n+' B'}
  function status(){
    const cmsPages=JSON.parse(localStorage.getItem('hmg_cms_pages_local')||'[]');
    const localBytes=keys.reduce((a,k)=>a+bytes(localStorage.getItem(k)||''),0);
    const map={
      cpSupabase:supabaseReady?'Connected / configured':'Not configured — local demo mode',
      cpStorage:fmt(localBytes),
      cpCmsPages:cmsPages.length,
      cpHost:location.protocol==='file:'?'Local file preview':location.hostname||'Local server',
      cpMode:supabaseReady?'Production-ready CMS mode':'Static/local mode',
      cpUrl:location.origin==='null'?'Local file':location.origin
    };
    Object.entries(map).forEach(([id,val])=>{const el=$('#'+id); if(el)el.textContent=val;});
    const bar=$('#cpReadiness');
    if(bar){ const score=(supabaseReady?45:10)+(location.protocol.startsWith('http')?20:5)+(cmsPages.length?15:0)+20; bar.style.width=Math.min(score,100)+'%'; $('#cpReadinessText').textContent=Math.min(score,100)+'% readiness'; }
  }
  function linkCheck(){
    const links=$$('a[href]').filter(a=>!a.href.startsWith('javascript:')).length;
    $('#cpLinkCount')&&($('#cpLinkCount').textContent=links);
    $('#cpPageCount')&&($('#cpPageCount').textContent=$$('a[href$=".html"],a[href*=".html?"]').length);
  }
  function exportAll(){
    const data={created_at:new Date().toISOString(),supabase_configured:supabaseReady,localStorage:{}};
    keys.forEach(k=>data.localStorage[k]=JSON.parse(localStorage.getItem(k)||'null'));
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const a=document.createElement('a');a.download='hmg-cpanel-full-local-export.json';a.href=URL.createObjectURL(blob);a.click();
  }
  function clearDemo(){ if(!confirm('Clear local demo/admin data in this browser? This does not delete Supabase data.'))return; keys.forEach(k=>localStorage.removeItem(k)); location.reload(); }
  function copyReport(){
    const report=`HMG Academy Control Panel Report\nURL: ${location.href}\nSupabase: ${supabaseReady?'Configured':'Not configured'}\nMode: ${supabaseReady?'Production-ready CMS':'Local/static'}\nLocal Storage: ${$('#cpStorage')?.textContent}\nCMS Pages Local: ${$('#cpCmsPages')?.textContent}\nGenerated: ${new Date().toLocaleString()}`;
    navigator.clipboard?.writeText(report); alert('Report copied.');
  }
  document.addEventListener('DOMContentLoaded',()=>{
    status(); linkCheck();
    $('#cpExport')&&($('#cpExport').onclick=exportAll);
    $('#cpClear')&&($('#cpClear').onclick=clearDemo);
    $('#cpCopyReport')&&($('#cpCopyReport').onclick=copyReport);
    $$('.cp-check').forEach(cb=>{ const key='hmg_cpanel_check_'+cb.value; cb.checked=localStorage.getItem(key)==='1'; cb.onchange=()=>localStorage.setItem(key,cb.checked?'1':'0'); });
  });
})();
