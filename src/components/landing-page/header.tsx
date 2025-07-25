// src/components/landing-page/header.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

/**
 * Cabeçalho da página inicial.
 * Contém o logo e os botões de navegação para login e cadastro.
 */
export const Header = () => {
  return (
    <header className="w-full bg-pink-600 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          {/* Botão para a página de login */}
          <Button variant="ghost" asChild className="text-white hover:bg-pink-700 hover:text-white">
            <Link href="/login">Entrar</Link>
          </Button>
          {/* Botão de destaque para a página de cadastro */}
          <Button asChild className="bg-oraculo-blue hover:bg-blue-900 text-white shadow-md">
            <Link href="/signup">Cadastre-se</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
