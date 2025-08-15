'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/ro',            label: 'Dashboard' },
  { href: '/ro/documents',  label: 'Toate documentele' },
  { href: '/ro/categories', label: 'Categorii' },
  { href: '/ro/trash',      label: 'Trash' },
  { href: '/ro/shared',     label: 'Shared Links' },
  { href: '/ro/settings',   label: 'Setări' },
];

export default function Nav(){
  const p = usePathname() || '';
  const isActive = (href:string) =>
    href === '/ro' ? (p === '/ro') : (p === href || p.startsWith(href + '/'));

  return (
    <nav style={{display:'flex',flexDirection:'column',gap:6}}>
      {items.map(it=>{
        const active = isActive(it.href);
        return (
          <Link key={it.href} href={it.href} style={{
            padding:'10px 12px',
            border:'1px solid #e5e7eb',
            borderRadius:8,
            textDecoration:'none',
            background: active? '#eef2ff' : '#fff',
            color:'#111827'
          }}>{it.label}</Link>
        );
      })}
    </nav>
  );
}
