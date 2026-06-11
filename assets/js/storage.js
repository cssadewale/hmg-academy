(function(){
  const cfg = window.HMG_SUPABASE || null;
  const status = (msg)=>{ document.querySelectorAll('[data-backup-status]').forEach(el=>el.textContent=msg); };
  window.HMGStorage = {
    enabled(){ return !!(cfg && cfg.url && cfg.anonKey && !cfg.url.includes('YOUR_PROJECT_ID')); },
    keys:['hmg_saved_tutors','hmg_compare_tutors','hmg_last_assessment','hmg_dashboard_students','hmg_study_desk','hmg_course_enrolments','hmg_assignments','hmg_attendance','hmg_certificate_records','hmg_support_tickets'],
    snapshot(){ const data={}; this.keys.forEach(k=>data[k]=JSON.parse(localStorage.getItem(k)||'null')); return data; },
    async backup(ownerKey){
      if(!this.enabled()){ status('Supabase is not configured. Local browser storage is active.'); return false; }
      ownerKey = ownerKey || localStorage.getItem('hmg_owner_key') || prompt('Create/enter backup key (example: parent phone or school code)');
      if(!ownerKey) return false; localStorage.setItem('hmg_owner_key', ownerKey);
      const payload={ owner_key:ownerKey, namespace:'academy_v5', payload:this.snapshot(), updated_at:new Date().toISOString() };
      const res=await fetch(`${cfg.url}/rest/v1/${cfg.table}?on_conflict=owner_key,namespace`,{method:'POST',headers:{'apikey':cfg.anonKey,'Authorization':`Bearer ${cfg.anonKey}`,'Content-Type':'application/json','Prefer':'resolution=merge-duplicates'},body:JSON.stringify(payload)});
      if(res.ok){status('Backup saved to Supabase free tier.'); return true;} const txt=await res.text(); status('Backup failed: '+txt.slice(0,120)); return false;
    },
    async restore(ownerKey){
      if(!this.enabled()){ status('Supabase is not configured. Nothing to restore from cloud.'); return false; }
      ownerKey = ownerKey || localStorage.getItem('hmg_owner_key') || prompt('Enter backup key'); if(!ownerKey)return false;
      const url=`${cfg.url}/rest/v1/${cfg.table}?owner_key=eq.${encodeURIComponent(ownerKey)}&namespace=eq.academy_v5&select=payload,updated_at&order=updated_at.desc&limit=1`;
      const res=await fetch(url,{headers:{'apikey':cfg.anonKey,'Authorization':`Bearer ${cfg.anonKey}`}});
      const rows=await res.json(); if(!rows.length){status('No backup found for that key.'); return false;}
      const data=rows[0].payload||{}; Object.entries(data).forEach(([k,v])=>{ if(v!==null) localStorage.setItem(k,JSON.stringify(v)); });
      status('Backup restored. Refreshing...'); setTimeout(()=>location.reload(),900); return true;
    },
    exportJson(){ const blob=new Blob([JSON.stringify(this.snapshot(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.download='hmg-academy-v5-backup.json'; a.href=URL.createObjectURL(blob); a.click(); },
    importJson(file){ const reader=new FileReader(); reader.onload=()=>{ const data=JSON.parse(reader.result); Object.entries(data).forEach(([k,v])=>localStorage.setItem(k,JSON.stringify(v))); status('JSON backup imported. Refreshing...'); setTimeout(()=>location.reload(),900); }; reader.readAsText(file); }
  };
  document.addEventListener('DOMContentLoaded',()=>{ document.querySelectorAll('[data-backup="save"]').forEach(b=>b.onclick=()=>HMGStorage.backup()); document.querySelectorAll('[data-backup="restore"]').forEach(b=>b.onclick=()=>HMGStorage.restore()); document.querySelectorAll('[data-backup="export"]').forEach(b=>b.onclick=()=>HMGStorage.exportJson()); document.querySelectorAll('[data-backup-import]').forEach(i=>i.onchange=e=>HMGStorage.importJson(e.target.files[0])); status(HMGStorage.enabled()?'Supabase backup ready.':'Local storage active. Add config.js to enable Supabase backup.'); });
})();
