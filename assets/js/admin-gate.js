(function(){
const cfg=window.HMG_SUPABASE||null; const ready=!!(cfg&&cfg.url&&cfg.anonKey&&!String(cfg.url).includes('YOUR_PROJECT_ID'));
const localOk=['localhost','127.0.0.1',''].includes(location.hostname)&&location.search.includes('demo=1');
const form=document.getElementById('adminGateForm'), msg=document.getElementById('adminGateMsg');
function show(t){msg.classList.remove('hidden');msg.textContent=t;}
async function login(email,password){const r=await fetch(`${cfg.url}/auth/v1/token?grant_type=password`,{method:'POST',headers:{'apikey':cfg.anonKey,'Content-Type':'application/json'},body:JSON.stringify({email,password})}); if(!r.ok) throw new Error(await r.text()); const data=await r.json(); localStorage.setItem('hmg_admin_session',JSON.stringify({access_token:data.access_token,refresh_token:data.refresh_token,user:data.user}));}
if(localOk){show('Local demo access enabled. Redirecting...'); setTimeout(()=>location.href=(new URLSearchParams(location.search).get('next')||document.querySelector('[name="next"]')?.value||'admin-dashboard.html')+'?demo=1',700)}
form&&form.addEventListener('submit',async e=>{e.preventDefault(); const d=new FormData(form); const next=d.get('next')||'admin-dashboard.html'; if(!ready){show('Supabase is not configured. Configure assets/js/config.js before using live admin login.'); return;} try{await login(d.get('email'),d.get('password')); location.href=next;}catch(err){show('Login failed. Check your credentials and Supabase Auth setup.')}});
})();
