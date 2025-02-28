import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    reactStrictMode: true,
    output: 'standalone', // Important for Vercel deployments

  
};

export default nextConfig;
