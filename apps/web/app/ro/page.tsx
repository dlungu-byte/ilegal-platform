export default function Page(){
  return (
    <div>
      <h1 style={{fontSize:24,fontWeight:800,marginBottom:8}}>Dashboard</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:12}}>
        {[
          ['123','Documente totale'],
          ['3','Confirmări pending'],
          ['8','Expiră în 15 zile'],
          ['2','Expirate'],
        ].map(([n,txt])=>(
          <div key={txt} style={{border:'1px solid #e5e7eb',borderRadius:12,padding:14,background:'#fff'}}>
            <div style={{fontSize:28,fontWeight:800}}>{n}</div>
            <div style={{color:'#6b7280'}}>{txt}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:16,border:'1px solid #e5e7eb',borderRadius:12,padding:14,background:'#f9fafb'}}>
        <b>Activitate recentă</b>
        <ul style={{marginTop:8,color:'#374151'}}>
          <li>Upload: CI Popescu.pdf</li>
          <li>Expirare: RCA ABC SRL (7 zile)</li>
          <li>Share: Contract #123 către client@email</li>
        </ul>
      </div>
    </div>
  );
}
