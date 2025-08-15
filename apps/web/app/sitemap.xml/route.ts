export function GET() {
  const lastmod = new Date().toISOString(); // ex: 2025-08-15T07:15:37.000Z
  const urls = ['/ro','/ro/documents','/ro/categories','/ro/trash','/ro/shared','/ro/settings'];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(loc => `  <url><loc>https://docs.ilegal.ro${loc}</loc><lastmod>${lastmod}</lastmod></url>`),
    '</urlset>',
  ].join('\n');
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' }});
}
