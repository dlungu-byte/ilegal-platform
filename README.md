# iLegal Docs

Next.js (App Router), Caddy, Docker Compose.
SEO: `robots.txt` + `sitemap.xml` (cu `<lastmod>`), redirect-uri spre `/ro/*`.

## Develop
Comandă de dev pornește totul cu Docker:
~~sh
docker compose up -d --build
~~

## Prod
- Reverse proxy: **Caddy** (80/443) → `web:3000`
- App: **Next.js 15 (App Router)** în container Docker
- Redirects:
  - `/` → `/ro` (308)
  - `/documents` → `/ro/documents` (308)
  - `/categories` → `/ro/categories` (308)
  - `/trash` → `/ro/trash` (308)
  - `/shared` → `/ro/shared` (308)
  - `/settings` → `/ro/settings` (308)

## SEO
- `robots.txt` servit din App Router (HEAD/GET identic ca headere, HEAD fără body)
- `sitemap.xml` cu 6 URL-uri și `<lastmod>` ISO
- Cache:
  - `robots.txt`: `s-maxage=31536000, stale-while-revalidate=86400`
  - `sitemap.xml`: `s-maxage=31536000`

## Verificări rapide
~~sh
# Redirecturi 308 către /ro/*
for p in "" documents categories trash shared settings; do
  curl -sI https://docs.ilegal.ro/$p | sed -n '1p;/^location:/Ip'
done

# SEO endpoints (200 + content-type corect)
curl -sI https://docs.ilegal.ro/robots.txt  | sed -n '1,8p'
curl -sI https://docs.ilegal.ro/sitemap.xml | sed -n '1,8p'
~~

## Stack
- Next.js 15 (App Router), TypeScript
- Caddy (reverse proxy)
- Docker Compose
