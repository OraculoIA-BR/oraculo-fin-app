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
       <path
        d="M13.4,19.5l-0.7-0.9c-0.1-0.1-0.2-0.2-0.3-0.2c-0.2,0-0.3,0-0.4,0.1l-1,0.6c-0.2,0.1-0.4,0.1-0.6,0l-1-0.6 C9,19,8.9,19,8.7,19.1c-0.1,0.1-0.2,0.1-0.3,0.2l-0.7,0.9c-0.1,0.2-0.1,0.4,0,0.5l0.7,0.9c0.2,0.2,0.4,0.3,0.7,0.3h1.9 c0.3,0,0.5-0.1,0.7-0.3l0.7-0.9C13.5,19.9,13.5,19.6,13.4,19.5z"
        fill="hsl(var(--primary))"
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
