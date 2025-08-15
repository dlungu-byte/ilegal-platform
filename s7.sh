set -e
cd ~/ilegal-platform

# (re)scrie package.json cu Tailwind & co
mkdir -p apps/web
cat > apps/web/package.json <<'PKG'
{
  "name": "ilegal-web",
  "private": true,
  "scripts": { "dev":"next dev -p 3000", "build":"next build", "start":"next start -p 3000" },
  "dependencies": {
    "next": "15.4.6",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "autoprefixer": "10.4.20",
    "postcss": "8.4.41",
    "tailwindcss": "3.4.13",
    "typescript": "5.9.2",
    "@types/react": "19.1.10",
    "@types/node": "20.14.10"
  }
}
PKG

# Next config
cat > apps/web/next.config.mjs <<'NEXT'
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
export default nextConfig;
NEXT

# tsconfig minim (Next îl poate genera, dar punem unul mic)
cat > apps/web/tsconfig.json <<'TS'
{ "compilerOptions": { "jsx":"preserve", "target":"ES2017", "module":"ESNext", "strict":false,
  "baseUrl":"." }, "include":["app/**/*","next-env.d.ts"] }
TS
echo '/// <reference types="next" />' > apps/web/next-env.d.ts

# Tailwind config + PostCSS
cat > apps/web/tailwind.config.ts <<'TW'
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors:{ primary:"#4338CA", secondary:"#10B981" } } },
  plugins: []
} satisfies Config;
TW
cat > apps/web/postcss.config.js <<'PC'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
PC

# stylesheet global
mkdir -p apps/web/app apps/web/public
cat > apps/web/app/globals.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --border:#e5e7eb; --muted:#6b7280; }
.container { @apply max-w-6xl mx-auto px-4; }
.btn { @apply inline-flex items-center rounded-lg border px-3 py-2 text-sm; }
.nav-a { @apply px-3 py-2 rounded-lg border hover:bg-gray-50; }
.card { @apply border rounded-xl p-4 bg-white; }
CSS

# layout + navbar + pagini schelet
cat > apps/web/app/layout.tsx <<'LAY'
export const metadata = {
  title: "iLegal Docs",
  description: "Platformă Cloud pentru Management Inteligent al Documentelor"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro"><body className="bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="container h-14 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg" style={{background:"linear-gradient(135deg,var(--tw-colors-primary),var(--tw-colors-secondary))"}}/>
          <b>iLegal Docs</b><span className="text-sm text-gray-500">• UI</span>
          <nav className="ml-auto flex gap-2">
            <a className="nav-a" href="/">Dashboard</a>
            <a className="nav-a" href="/documents">Documente</a>
            <a className="nav-a" href="/categories">Categorii</a>
            <a className="nav-a" href="/shared">Shared</a>
            <a className="nav-a" href="/trash">Trash</a>
            <a className="nav-a" href="/settings">Setări</a>
          </nav>
        </div>
      </header>
      <main className="container py-6">{children}</main>
      <footer className="border-t text-xs text-gray-500">
        <div className="container h-12 flex items-center">© iLegal Tech</div>
      </footer>
    </body></html>
  );
}
LAY

# index + celelalte pagini cu placeholder
cat > apps/web/app/page.tsx <<'PG'
export default function Page(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Documente","Confirmări","Expiră în 15 zile","Expirate"].map((t,i)=>(
          <div key={i} className="card"><div className="text-sm text-gray-600">{t}</div><div className="text-2xl font-bold mt-1">0</div></div>
        ))}
      </div>
      <div className="card">Activitate recentă (placeholder)</div>
    </div>
  );
}
PG

for p in documents categories shared trash settings; do
cat > "apps/web/app/$p/page.tsx" <<'P2'
export default function P(){ return (
  <div className="space-y-4">
    <h1 className="text-2xl font-extrabold">Placeholder</h1>
    <div className="card">Conținutul paginii va fi implementat în pașii următori.</div>
  </div>
); }
P2
done

# rebuild & restart
docker compose build web
docker compose up -d
