// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Importação da fonte do Google
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';

// Configuração da fonte Inter para ser usada em toda a aplicação.
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Define uma variável CSS para a fonte.
});

// Metadados da página, importantes para SEO.
export const metadata: Metadata = {
  title: 'Oráculo Financeiro',
  description: 'Seu assistente financeiro pessoal com o poder da IA.',
};

/**
 * Layout raiz da aplicação.
 * Envolve todas as páginas com os provedores de contexto (Autenticação) e componentes globais (Toaster).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* O AuthProvider gerencia o estado de autenticação em toda a aplicação. */}
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* O Toaster é responsável por exibir as notificações. */}
        <Toaster />
      </body>
    </html>
  );
}
