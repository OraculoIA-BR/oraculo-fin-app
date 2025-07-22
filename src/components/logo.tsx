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
        fill="hsl(var(--primary))"
      />
      <path
        d="M20 32a12 12 0 1 0 0-24 12 12 0 0 0 0 24z"
        fill="hsl(var(--background))"
      />
       <text
        x="20"
        y="28"
        fontFamily="Inter, sans-serif"
        fontSize="24"
        textAnchor="middle"
        fill="hsl(var(--accent))"
      >
        *
      </text>
      <text
        x="45"
        y="30"
        fontFamily="Inter, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        ráculo
      </text>
    </svg>
  );
}
