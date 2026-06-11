import { readdir, readFile, writeFile } from 'node:fs/promises';
const files=(await readdir('.')).filter(f=>f.endsWith('.html'));
const items=[];
for(const file of files){
  const html=await readFile(file,'utf8');
  const title=(html.match(/<title>(.*?)<\/title>/s)?.[1]||file).replace(/\s+/g,' ').trim();
  const desc=(html.match(/<meta name="description" content="(.*?)"/s)?.[1]||'').replace(/\s+/g,' ').trim();
  const text=html.replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<style[\s\S]*?<\/style>/g,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,1200);
  if(file !== 'admin.html') items.push({title,desc,url:file,keywords:text});
}
await writeFile('search-index.json', JSON.stringify(items,null,2));
console.log(`Wrote ${items.length} search records`);
