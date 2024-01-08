/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'www.mycourseville.com',
            },
          ],
    }
}

module.exports = nextConfig
