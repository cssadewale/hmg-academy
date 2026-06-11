import { readdir, readFile, access } from 'node:fs/promises';
const files=(await readdir('.')).filter(f=>f.endsWith('.html'));
const missing=[];
for(const file of files){
 const html=await readFile(file,'utf8');
 const refs=[...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
 for(const ref of refs){
  if(/^(https?:|mailto:|tel:|#|data:|javascript:)/.test(ref)||!ref) continue;
  const target=ref.split('#')[0].split('?')[0]; if(!target) continue;
  try{ await access(target); }catch{ missing.push(`${file} -> ${ref}`); }
 }
}
if(missing.length){ console.error('Missing refs:\n'+missing.join('\n')); process.exit(1); }
console.log('No missing internal references.');
