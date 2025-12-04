import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
