import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',          // Static HTML export — no Node.js server needed
  trailingSlash: true,       // /login/ → login/index.html
  images: {
    unoptimized: true,       // Required for static export
  },
};

export default nextConfig;
