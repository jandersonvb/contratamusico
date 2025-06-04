import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [ // Use remotePatterns para maior segurança e flexibilidade
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Para imagens do Google
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com', // Para imagens do Facebook
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Para imagens do Firebase Storage
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
