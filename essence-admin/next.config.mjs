/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/admin",
  assetPrefix: "/admin",
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
