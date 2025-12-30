/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["example.com"], // Add any domains you need for external images
  },
  // Enable static optimization for faster builds
  reactStrictMode: true,
};

module.exports = nextConfig;
