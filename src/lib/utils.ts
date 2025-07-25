// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina e mescla classes do Tailwind CSS de forma inteligente.
 * 
 * Esta função utilitária usa `clsx` para lidar com a lógica condicional de classes
 * e `tailwind-merge` para resolver conflitos de classes do Tailwind.
 * 
 * @param {...ClassValue[]} inputs - Uma lista de classes a serem aplicadas.
 * @returns {string} Uma string com as classes finais mescladas.
 * 
 * @example
 * cn("p-4", "font-bold", { "bg-red-500": hasError });
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
