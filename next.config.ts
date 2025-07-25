import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Ignora os erros de TypeScript durante o build.
    // ATENÇÃO: É altamente recomendável corrigir os erros de TypeScript em vez de ignorá-los.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora os erros do ESLint durante o build.
    // ATENÇÃO: É altamente recomendável corrigir os erros do ESLint em vez de ignorá-los.
    ignoreDuringBuilds: true,
  },
  images: {
    // Configuração para permitir imagens de domínios externos.
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
