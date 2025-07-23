// src/ai/genkit.ts
import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';
import { genkitEval, GenkitTracer } from '@genkit-ai/evaluator';
import { dotprompt } from '@genkit-ai/dotprompt';

// Esta é a configuração que estava faltando.
// Ela inicializa o Genkit e informa quais plugins ele deve usar.
export default configureGenkit({
  plugins: [
    // Registra o plugin do Google AI, que disponibiliza os modelos Gemini.
    // É isso que permite que a função `generate` encontre o `gemini15Pro`.
    googleAI(),
    // Estes são outros plugins úteis que podemos usar no futuro.
    dotprompt(),
    genkitEval(),
  ],
  // Onde os traços de execução (logs) são armazenados.
  traceStore: {
    provider: 'dev', // ou 'firebase' se você quiser logs persistentes
  },
  // Permite o log para depuração.
  logLevel: 'debug',
  // Impede que erros em telemetria (que não afetam o resultado) quebrem a aplicação.
  enableTracingAndMetrics: true,
});
