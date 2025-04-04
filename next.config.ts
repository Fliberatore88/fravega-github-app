import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      
    ],
  },
  experimental: {
    allowedDevOrigins: ['192.168.0.129'],
  },
  reactStrictMode: true,
};

export default nextConfig;