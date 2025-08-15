export function GET() {
  const body = `User-agent: *
Allow: /ro/
Allow: /_next/
Allow: /_next/static/
Allow: /_next/image
Allow: /favicon.ico
Allow: /sitemap.xml
Disallow: /
Sitemap: https://docs.ilegal.ro/sitemap.xml
`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=31536000, stale-while-revalidate=86400',
    },
  });
}

export async function HEAD() {
  const res = await GET();
  // Fără body pentru HEAD, dar păstrăm status + headere
  return new Response(null, { status: res.status, headers: res.headers });
}
