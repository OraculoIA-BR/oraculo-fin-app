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
        fill="#FFFFFF"
      />
      <path
        d="M20 32a12 12 0 1 0 0-24 12 12 0 0 0 0 24z"
        fill="#FFFFFF"
      />
       <path
        d="M33.8 15.62l-1.36-1.922a.81.81 0 0 0-.52-.619.81.81 0 0 0-.69.06l-1.99 1.32c-.34.222-.77.222-1.11 0l-1.99-1.32a.81.81 0 0 0-.69-.06.81.81 0 0 0-.52.62l-1.36 1.921c-.23.335-.23.748 0 1.082l1.36 1.923c.31.439.82.68 1.34.68h3.83c.52 0 1.03-.24 1.34-.68l1.36-1.923c.23-.334.23-.747 0-1.082z"
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
        fill="#FFFFFF"
      >
        ráculo
      </text>
    </svg>
  );
}
