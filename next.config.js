/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
