'use client';
import { useMemo, useState } from 'react';

const CATS = ['HR','Juridic','Auto','Financiar','Contracte'];

function makeDocs() {
  const out:any[] = [];
  for (let i=1;i<=32;i++){
    const cat = CATS[i % CATS.length];
    const up = new Date(Date.now() - i*86400000);
    const ex = i%5===0 ? null : new Date(Date.now() + ((i%30)+1)*86400000);
    out.push({
      id:i,
      name:`Document ${i}.pdf`,
      category:cat,
      uploaded: up.toISOString().slice(0,10),
      expires: ex ? ex.toISOString().slice(0,10) : null
    });
  }
  return out;
}
const daysLeft = (d?:string|null)=> d ? Math.ceil((+new Date(d) - Date.now())/86400000) : null;

export default function Page(){
  const [q,setQ] = useState('');
  const [sort,setSort] = useState<'expiry'|'name'|'category'|'uploaded'>('expiry');
  const [sel,setSel] = useState<number[]>([]);
  const [docs] = useState(makeDocs);

  const filtered = useMemo(()=> {
    const f = docs.filter((d:any)=>{
      const s=q.toLowerCase();
      return d.name.toLowerCase().includes(s) || d.category.toLowerCase().includes(s);
    });
    f.sort((a:any,b:any)=>{
      if (sort==='name') return a.name.localeCompare(b.name);
      if (sort==='category') return a.category.localeCompare(b.category);
      if (sort==='uploaded') return a.uploaded>b.uploaded?-1:1;
      const ax = a.expires? (daysLeft(a.expires) ?? 9e9) : 9e9;
      const bx = b.expires? (daysLeft(b.expires) ?? 9e9) : 9e9;
      return ax-bx;
    });
    return f;
  },[docs,q,sort]);

  const toggle = (id:number)=> setSel(s=> s.includes(id)? s.filter(x=>x!==id) : [...s,id]);
  const toggleAll = ()=> setSel(sel.length===filtered.length? [] : filtered.map((d:any)=>d.id));
  const share = ()=> alert(sel.length? `(DEMO) Share pentru: ${sel.join(', ')}` : 'Selectează documente.');

  const pill = (txt:string, bg:string, color='#111827') =>
    <span style={{fontSize:12,padding:'2px 8px',borderRadius:999,background:bg,color,border:'1px solid #e5e7eb'}}>{txt}</span>;

  return (
    <div>
      <h1 style={{fontSize:24,fontWeight:800,marginBottom:8}}>Toate documentele</h1>

      <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:12}}>
        <input placeholder="Caută după nume/categorie" value={q} onChange={e=>setQ(e.target.value)}
          style={{padding:'8px 10px',border:'1px solid #e5e7eb',borderRadius:8,minWidth:260}}/>
        <select value={sort} onChange={e=>setSort(e.target.value as any)}
          style={{padding:'8px 10px',border:'1px solid #e5e7eb',borderRadius:8}}>
          <option value="expiry">Sortează: expirare (aproape întâi)</option>
          <option value="name">Sortează: denumire</option>
          <option value="category">Sortează: categorie</option>
          <option value="uploaded">Sortează: data încărcării</option>
        </select>
        <button onClick={share}
          style={{padding:'8px 12px',border:'1px solid #e5e7eb',borderRadius:8,background:'#fff'}}>Share selecție</button>
        <div style={{marginLeft:'auto',fontSize:12,color:'#6b7280'}}>{filtered.length} rezultate</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {filtered.map((d:any)=>{
          const dl = daysLeft(d.expires);
          return (
            <div key={d.id} style={{border:'1px solid #e5e7eb',borderRadius:12,padding:12,background:'#fff'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                <input type="checkbox" checked={sel.includes(d.id)} onChange={()=>toggle(d.id)} />
                <button onClick={()=>alert('(DEMO) Preview '+d.name)}
                  style={{fontSize:12,border:'1px solid #e5e7eb',padding:'2px 8px',borderRadius:6,background:'#f9fafb'}}>Preview</button>
              </div>
              <div style={{height:100,border:'1px dashed #e5e7eb',borderRadius:8,marginBottom:8,background:'#fafafa',
                display:'flex',alignItems:'center',justifyContent:'center',color:'#9ca3af'}}>thumbnail</div>
              <div style={{fontWeight:600,marginBottom:4,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={d.name}>{d.name}</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
                {pill(d.category,'#eef2ff','#1f2937')}
                {d.expires ? pill(`Expiră: ${d.expires}`, (dl??99)<=15 ? '#fee2e2' : '#e5f2ff') : pill('Nu expiră','#e5ffe9')}
              </div>
              <div style={{marginTop:8,fontSize:12,color:'#6b7280'}}>Încărcat: {d.uploaded} • {d.expires? `Zile rămase: ${dl}`:'—'}</div>
            </div>
          );
        })}
      </div>

      <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}>
        <input type="checkbox" onChange={toggleAll} checked={filtered.length>0 && sel.length===filtered.length}/>
        <span style={{fontSize:12}}>Selectează toate</span>
      </div>
    </div>
  );
}
