/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    legacyBrowsers: false,
    esmExternals: false,
  },
};

module.exports = nextConfig;
