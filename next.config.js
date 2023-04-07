/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['breeze-video.com']
  },
  crossOrigin: "anonymous",
  env: {
    NEXTAUTH_SECRET: 'breeze-video',
    NEXTAUTH_URL: 'http://localhost:3000'
  },
  // basePath: '/'
}

module.exports = nextConfig
