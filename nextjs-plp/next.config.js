/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com" }
    ]
  },
  experimental: {
    optimizeCss: true
  }
};

module.exports = nextConfig;
