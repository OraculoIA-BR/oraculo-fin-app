import { genkit } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';

console.log('[Oraculo IA] Configurando Genkit com o plugin Vertex AI.');

export const ai = genkit({
  plugins: [
    vertexAI({ location: 'us-east1' }),
  ],
  traceStore: {
    provider: 'dev',
  },
  logLevel: 'debug',
});