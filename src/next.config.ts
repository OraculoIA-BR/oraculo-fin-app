// next.config.ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Configuração para permitir imagens de domínios externos.
  // O domínio 'placehold.co' é usado para os placeholders de imagem na landing page.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
