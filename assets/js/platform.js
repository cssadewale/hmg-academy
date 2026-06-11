(function(){
const cfg=window.HMG_SUPABASE||null;
const ready=!!(cfg&&cfg.url&&cfg.anonKey&&!String(cfg.url).includes('YOUR_PROJECT_ID'));
const localKey='hmg_v8_platform_local';
const seed={
 profiles:[{id:'demo-student',role:'student',full_name:'Demo Student',email:'student@demo.local',school_id:'hmg-demo-school'},{id:'demo-parent',role:'parent',full_name:'Demo Parent',email:'parent@demo.local',linked_student_ids:['demo-student']},{id:'demo-tutor',role:'tutor',full_name:'Demo Tutor',email:'tutor@demo.local'}],
 courses:[{id:'utme-math',title:'UTME Mathematics Accelerator',category:'Exam Prep',level:'SSS/UTME',status:'published'},{id:'sql-data',title:'SQL for Data Analysis',category:'Data Skills',level:'Beginner',status:'published'},{id:'senior-waec',title:'Senior Class WAEC Pathway',category:'Virtual Schooling',level:'SSS1-SSS3',status:'published'}],
 enrollments:[{id:'enr-1',student_id:'demo-student',course_id:'utme-math',progress:62,status:'active'}],
 lessons:[{id:'les-1',course_id:'utme-math',title:'Algebra diagnostic and timed drills',order_no:1,type:'live'},{id:'les-2',course_id:'utme-math',title:'Functions and graphs practice',order_no:2,type:'cbt'}],
 assignments:[{id:'ass-1',course_id:'utme-math',student_id:'demo-student',title:'Complete 30 algebra CBT questions',status:'submitted',due_date:'2026-06-20'}],
 attendance:[{id:'att-1',student_id:'demo-student',course_id:'utme-math',status:'present',session_date:'2026-06-11'}],
 grades:[{id:'gr-1',student_id:'demo-student',course_id:'utme-math',score:78,max_score:100,assessment_type:'CBT Mock'}],
 certificates:[],
 booking_requests:[],
 messages:[{id:'msg-1',from_role:'tutor',to_role:'parent',body:'Demo Student improved in algebra timing. Next focus: graphs.',created_at:new Date().toISOString()}],
 schools:[{id:'hmg-demo-school',name:'HMG Demo School',plan:'Free Pilot',students_count:1}]
};
function store(){return JSON.parse(localStorage.getItem(localKey)||JSON.stringify(seed));}
function save(data){localStorage.setItem(localKey,JSON.stringify(data));}
function h(){return {'apikey':cfg.anonKey,'Authorization':`Bearer ${JSON.parse(localStorage.getItem('hmg_admin_session')||'{}').access_token||cfg.anonKey}`,'Content-Type':'application/json'};}
async function rest(table,query='select=*'){if(!ready)throw new Error('Supabase not configured');const r=await fetch(`${cfg.url}/rest/v1/${table}?${query}`,{headers:h()}); if(!r.ok)throw new Error(await r.text()); return r.json();}
async function insert(table,row){if(!ready)throw new Error('Supabase not configured');const r=await fetch(`${cfg.url}/rest/v1/${table}`,{method:'POST',headers:{...h(),'Prefer':'return=representation'},body:JSON.stringify(row)}); if(!r.ok)throw new Error(await r.text()); return (await r.json())[0];}
async function update(table,id,patch){if(!ready)throw new Error('Supabase not configured');const r=await fetch(`${cfg.url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',headers:{...h(),'Prefer':'return=representation'},body:JSON.stringify(patch)}); if(!r.ok)throw new Error(await r.text()); return (await r.json())[0];}
function byId(arr,id){return arr.find(x=>x.id===id)}
function pct(n){return Math.max(0,Math.min(100,Number(n)||0))}
window.HMGPlatform={
 ready, store, save, seed,
 async list(table){ if(ready){try{return await rest('hmg_'+table,'select=*')}catch(e){console.warn('Supabase list fallback',table,e)}} return store()[table]||[];},
 async create(table,row){ row.id=row.id||`${table}-${Date.now()}`; row.created_at=new Date().toISOString(); if(ready){try{return await insert('hmg_'+table,row)}catch(e){console.warn('Supabase create fallback',table,e)}} const data=store(); data[table]=data[table]||[]; data[table].push(row); save(data); return row;},
 async patch(table,id,patchRow){ if(ready){try{return await update('hmg_'+table,id,patchRow)}catch(e){console.warn('Supabase update fallback',table,e)}} const data=store(); const arr=data[table]||[]; const i=arr.findIndex(x=>x.id===id); if(i>=0)arr[i]={...arr[i],...patchRow,updated_at:new Date().toISOString()}; save(data); return arr[i];},
 async dashboard(role='student'){
  const data=store();
  return {role, profiles:data.profiles, courses:data.courses, enrollments:data.enrollments, lessons:data.lessons, assignments:data.assignments, attendance:data.attendance, grades:data.grades, certificates:data.certificates, messages:data.messages, schools:data.schools};
 },
 export(){const blob=new Blob([JSON.stringify(store(),null,2)],{type:'application/json'});const a=document.createElement('a');a.download='hmg-academy-v8-platform-export.json';a.href=URL.createObjectURL(blob);a.click();},
 import(file){const r=new FileReader();r.onload=()=>{save(JSON.parse(r.result));location.reload()};r.readAsText(file);}, pct
};
function renderMiniDashboard(){const root=document.querySelector('[data-v8-dashboard]'); if(!root)return; const role=root.dataset.v8Dashboard||'student'; const data=store(); const student='demo-student'; const enr=data.enrollments.find(e=>e.student_id===student)||{}; const grade=data.grades.filter(g=>g.student_id===student); const avg=grade.length?Math.round(grade.reduce((a,b)=>a+b+(b.score/(b.max_score||100)*100),0)/grade.length):0; root.innerHTML=`<div class="grid grid-4"><div class="v8-school-metric"><strong>${pct(enr.progress||0)}%</strong><span>Course Progress</span></div><div class="v8-school-metric"><strong>${avg}%</strong><span>Average Score</span></div><div class="v8-school-metric"><strong>${data.assignments.length}</strong><span>Assignments</span></div><div class="v8-school-metric"><strong>${data.attendance.length}</strong><span>Attendance Logs</span></div></div>`;}
document.addEventListener('DOMContentLoaded',renderMiniDashboard);
})();
