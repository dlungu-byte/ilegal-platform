import Nav from './Nav';

export const metadata = {
  title: 'iLegal Docs',
  description: 'Platformă Cloud pentru Management Inteligent al Documentelor',
};

export default function RoLayout({children}:{children:React.ReactNode}){
  return (
    <div style={{fontFamily:'system-ui,-apple-system,Segoe UI,Roboto,Arial'}}>
      <header style={{borderBottom:'1px solid #e5e7eb',background:'#fff'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'12px 16px',display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:36,height:36,borderRadius:8,background:'linear-gradient(135deg,#4338CA,#10B981)'}}/>
          <strong>iLegal Docs</strong>
          <span style={{color:'#6b7280'}}>• UI</span>
        </div>
      </header>

      <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'240px 1fr',gap:16,padding:16}}>
        <aside><Nav/></aside>
        <main>{children}</main>
      </div>

      <footer style={{borderTop:'1px solid #e5e7eb',color:'#6b7280',fontSize:12}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'12px 16px'}}>© iLegal Tech</div>
      </footer>
    </div>
  );
}
