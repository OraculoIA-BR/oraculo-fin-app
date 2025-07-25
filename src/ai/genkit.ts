// src/ai/genkit.ts
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
// REMOVIDO: O plugin genkitEval não é necessário para a geração padrão e é a causa provável do erro.
// import { genkitEval } from '@genkit-ai/evaluator';

console.log('[Oraculo IA] Configurando o ambiente Genkit (Simplificado)...');

// Exporta a instância configurada para ser usada em outros módulos.
export const ai = genkit({
  plugins: [
    // Apenas o plugin essencial para se comunicar com a API do Google.
    googleAI(),
    // REMOVIDO: genkitEval()
  ],
  traceStore: {
    provider: 'dev',
  },
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
