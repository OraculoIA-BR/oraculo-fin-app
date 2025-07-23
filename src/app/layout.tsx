import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/contexts/AuthContext'; // Importe o AuthProvider

export const metadata: Metadata = {
  title: 'Oráculo Financeiro',
  description: 'Seu assistente financeiro pessoal com o poder da IA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <AuthProvider> {/* Envolva os children com o AuthProvider */}
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
