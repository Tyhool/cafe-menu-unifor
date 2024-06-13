/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cafeteria-unifor-thy.s3.amazonaws.com',
        },
      ]
    }
  }
  
  module.exports = nextConfig