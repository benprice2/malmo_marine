import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["example.com"], // Add any domains you need for external images
  },
  // Enable static optimization for faster builds
  reactStrictMode: true,
};

export default nextConfig;
