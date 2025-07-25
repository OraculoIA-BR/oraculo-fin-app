// src/components/logo.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/**
 * Componente do logo da aplicação.
 * Exibe o ícone e o nome "Oráculo".
 */
export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <Link href="/" aria-label="Voltar para a página inicial">
      <div className="flex items-center gap-2">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("h-8 w-8", className)}
          {...props}
        >
          <title>Oráculo Icon</title>
          <circle cx="20" cy="20" r="20" fill="hsl(var(--primary))" />
          <circle cx="20" cy="20" r="12" fill="hsl(var(--background))" />
          <text
            x="20"
            y="28"
            fontFamily="Inter, sans-serif"
            fontSize="24"
            textAnchor="middle"
            fill="hsl(var(--pink-500))"
          >
            *
          </text>
        </svg>
        <span className="text-2xl font-bold text-blue-900">Oráculo</span>
      </div>
    </Link>
  );
}
