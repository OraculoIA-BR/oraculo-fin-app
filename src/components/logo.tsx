import * as React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="145"
      height="40"
      viewBox="0 0 145 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto", className)}
      {...props}
    >
      <title>Oráculo Logo</title>
      <path
        d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0h24c8.837 0 16 7.163 16 16v8c0 8.837-7.163 16-16 16H20z"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M20 32a12 12 0 1 0 0-24 12 12 0 0 0 0 24z"
        fill="hsl(var(--primary-foreground))"
      />
      <path
        d="M45.69 16.714a1.921 1.921 0 0 1-1.309.529h-2.13a1.921 1.921 0 0 1-1.31-.529 1.77 1.77 0 0 1-.54-1.265v-2.062a1.77 1.77 0 0 1 .54-1.265c.34-.343.8-.529 1.31-.529h2.13c.509 0 .969.186 1.309.53a1.77 1.77 0 0 1 .54 1.264v2.062a1.77 1.77 0 0 1-.54 1.265zm-1.78-1.265v-2.062a.208.208 0 0 0-.06-.15.22.22 0 0 0-.161-.064h-2.13a.22.22 0 0 0-.161.064.208.208 0 0 0-.06.15v2.062c0 .06.02.109.06.15a.22.22 0 0 0 .161.063h2.13c.062 0 .114-.02.161-.063a.208.208 0 0 0 .06-.15z"
        fill="hsl(var(--primary-foreground))"
        display="none"
      />
      <path
        d="M37.33 13.064c.23-.334.23-.747 0-1.082l-1.36-1.923a.81.81 0 0 0-1.125-.3l-1.99 1.32c-.34.223-.77.223-1.11 0l-1.99-1.32a.81.81 0 0 0-1.125.3l-1.36 1.923c-.23.335-.23.748 0 1.082l1.36 1.923c.15.21.37.3.62.3h2.44c.25 0 .47-.09.62-.3l1.36-1.923zM33.8 15.62l-1.36-1.922a.81.81 0 0 0-.52-.619.81.81 0 0 0-.69.06l-1.99 1.32c-.34.222-.77.222-1.11 0l-1.99-1.32a.81.81 0 0 0-.69-.06.81.81 0 0 0-.52.62l-1.36 1.921c-.23.335-.23.748 0 1.082l1.36 1.923c.31.439.82.68 1.34.68h3.83c.52 0 1.03-.24 1.34-.68l1.36-1.923c.23-.334.23-.747 0-1.082z"
        fill="hsl(var(--accent))"
        stroke="hsl(var(--accent))"
        strokeWidth=".2"
      />
      <text
        x="60"
        y="30"
        fontFamily="Inter, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
        className="text-primary-foreground"
      >
        ráculo
      </text>
    </svg>
  );
}
