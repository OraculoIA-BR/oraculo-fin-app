import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

console.log('[Oraculo IA] Configurando Genkit com GoogleAI.');
console.log('[Oraculo IA] Tentando localizar GOOGLE_API_KEY no ambiente.');

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  traceStore: {
    provider: 'dev', // Local trace para depuração.
  },
  logLevel: 'debug',
});