import { cn } from '@/lib/utils';
import React from 'react';

const StarIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg 
        width="100" 
        height="100" 
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)} 
        {...props}
    >
        <polygon points="50,5 61.8,35.4 95.1,35.4 68.2,55.3 79.6,85.4 50,65.5 20.4,85.4 31.8,55.3 4.9,35.4 38.2,35.4" />
    </svg>
);


export function Decoration() {
  return (
    <div className="h-full w-full bg-primary relative overflow-hidden">
        <div 
            className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-primary-foreground/20"
            style={{clipPath: 'polygon(0 25%, 100% 25%, 100% 50%, 0 50%)', transform: 'rotate(-45deg)'}}
        />
        <div 
            className="absolute top-[20px] right-[20px] w-[200px] h-[200px] bg-primary-foreground/20"
            style={{clipPath: 'polygon(0 25%, 100% 25%, 100% 50%, 0 50%)', transform: 'rotate(-45deg)'}}
        />
         <div 
            className="absolute top-[90px] right-[90px] w-[200px] h-[200px] bg-primary-foreground/20"
            style={{clipPath: 'polygon(0 25%, 100% 25%, 100% 50%, 0 50%)', transform: 'rotate(-45deg)'}}
        />

        <div className="absolute top-[200px] right-[40px] w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <StarIcon className="w-12 h-12 text-accent fill-current" />
        </div>
        
        <div className="absolute top-[320px] -right-20 w-60 h-60">
             <div className="w-full h-full rounded-full bg-white/40" />
        </div>

        <div className="absolute bottom-[200px] right-[40px] w-32 h-32 flex items-center justify-center">
             <StarIcon className="w-24 h-24 text-white fill-current" />
        </div>

        <div className="absolute bottom-[-100px] right-[-100px] w-60 h-60">
             <div className="w-full h-full rounded-full bg-white" />
        </div>
    </div>
  );
}
