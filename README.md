# iLegal Docs

Next.js (App Router), Caddy, Docker Compose.
SEO: robots.txt + sitemap.xml (cu <lastmod>), redirect-uri spre /ro/*.

## Develop
Comandă de dev pornește totul cu Docker: docker compose up -d --build

## Prod
- Reverse proxy: Caddy (80/443) → web:3000
- App: Next.js 15 (App Router) în container Docker
- Redirecturi 308:
  - / → /ro
  - /documents → /ro/documents
  - /categories → /ro/categories
  - /trash → /ro/trash
  - /shared → /ro/shared
  - /settings → /ro/settings

## SEO
- robots.txt servit din App Router (HEAD și GET au aceleași headere; HEAD fără body)
- sitemap.xml cu 6 URL-uri și <lastmod> ISO
- Cache:
  - robots.txt: s-maxage=31536000, stale-while-revalidate=86400
  - sitemap.xml: s-maxage=31536000

## Stack
- Next.js 15 (App Router), TypeScript
- Caddy (reverse proxy)
- Docker Compose

Status: ![web-ci](https://github.com/dlungu-byte/ilegal-platform/actions/workflows/ci.yml/badge.svg?branch=main)

