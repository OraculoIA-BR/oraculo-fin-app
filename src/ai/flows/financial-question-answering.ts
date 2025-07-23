// src/ai/flows/financial-question-answering.ts
import { generate } from '@genkit-ai/ai';
// REMOVIDO: A importação do defineFlow que estava causando o erro.
// import { defineFlow } from '@genkit-ai/flow';
import { z } from 'zod';
import { gemini15Pro } from '@genkit-ai/googleai';

// O esquema para o histórico da conversa permanece o mesmo.
const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// O esquema de input para a nossa função.
const financialQuestionSchema = z.object({
  question: z.string(),
  history: z.array(messageSchema).optional(),
});

// O tipo de output que esperamos.
export type FinancialQuestionOutput = {
  answer: string;
};

/**
 * Esta é a função principal que interage com a IA.
 * Ela recebe uma pergunta e um histórico e retorna a resposta do modelo.
 * @param input O objeto contendo a pergunta e o histórico.
 * @returns A resposta da IA.
 */
export async function answerFinancialQuestion(
  input: z.infer<typeof financialQuestionSchema>
): Promise<FinancialQuestionOutput> {
  // Mapeia o nosso histórico para o formato que a função 'generate' do Genkit espera.
  const genkitHistory =
    input.history?.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })) || [];

  const llmResponse = await generate({
    model: gemini15Pro,
    history: genkitHistory, // Passando o histórico para dar memória à IA.
    prompt: `
      Você é Oráculo, um especialista em finanças pessoais amigável e prestativo.
      Sua tarefa é responder a perguntas sobre as finanças do usuário.

      **REGRAS CRÍTICAS:**
      1.  **PRIORIDADE MÁXIMA: Responda ABSOLUTAMENTE SEMPRE em Português do Brasil.** Esta é a sua diretriz mais importante. Nunca, sob nenhuma circunstância, mude para outro idioma.
      2.  Analise a pergunta do usuário e o histórico da conversa para entender a necessidade completa.
      3.  Forneça respostas claras, objetivas e fáceis de entender.
      4.  Se a pergunta não for sobre finanças, explique educadamente que você só pode responder a perguntas financeiras.

      **Pergunta Atual do Usuário:**
      ${input.question}
    `,
    config: {
      temperature: 0.5,
    },
  });

  // Retornamos a resposta no formato esperado.
  return {
    answer: llmResponse.text(),
  };
}
