
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      { // Added for Python logo
        protocol: 'https',
        hostname: 'www.python.org',
        port: '',
        pathname: '/static/community_logos/**',
      },
    ],
  },
};

export default nextConfig;
