import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    reactStrictMode: true,
    output: 'standalone', // Important for Vercel deployments
    eslint: {
      ignoreDuringBuilds: true,
    },

  
};

export default nextConfig;
