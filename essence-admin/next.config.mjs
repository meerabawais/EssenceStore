/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/admin",
  assetPrefix: "/admin",
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      // With basePath set, Next only serves paths under /admin — visiting the
      // bare root (e.g. hitting this app directly on :3003 instead of through
      // the gateway) 404s instead of routing anywhere. basePath: false opts
      // this one rule out of the automatic /admin prefixing on both sides so
      // "/" itself is reachable; from there app/page.js -> /dashboard -> the
      // middleware's auth check takes over, sending signed-out visitors to
      // /admin/login and already-authenticated admins to /admin/dashboard.
      {
        source: "/",
        destination: "/admin",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
