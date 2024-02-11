/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mycourseville.com"
      }
    ]
  }
};

module.exports = nextConfig;
