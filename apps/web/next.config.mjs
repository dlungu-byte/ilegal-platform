/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/',           destination: '/ro',           permanent: true },
      { source: '/documents',  destination: '/ro/documents', permanent: true },
      { source: '/categories', destination: '/ro/categories', permanent: true },
      { source: '/trash',      destination: '/ro/trash',      permanent: true },
      { source: '/shared',     destination: '/ro/shared',     permanent: true },
      { source: '/settings',   destination: '/ro/settings',   permanent: true },
    ];
  },
};
export default nextConfig;
