// src/ai/flows/financial-question-answering.ts
import { generate } from '@genkit-ai/ai';
import { defineFlow } from '@genkit-ai/flow';
import { z } from 'zod';
import { geminiPro } from '@genkit-ai/googleai';

// Esquema para o histórico da conversa
const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const financialQuestionAnsweringFlow = defineFlow(
  {
    name: 'financialQuestionAnsweringFlow',
    // O input agora aceita uma pergunta E um histórico opcional
    inputSchema: z.object({
      question: z.string(),
      history: z.array(messageSchema).optional(),
    }),
    outputSchema: z.object({ answer: z.string() }),
  },
  async ({ question, history }) => {
    // Mapeia nosso histórico para o formato que o Genkit espera
    const genkitHistory = history?.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })) || [];

    const llmResponse = await generate({
      model: geminiPro,
      // Passamos o histórico para o modelo
      history: genkitHistory,
      prompt: `
        Você é Oráculo, um especialista em finanças pessoais amigável e prestativo.
        Sua tarefa é responder a perguntas sobre as finanças do usuário.

        **REGRAS CRÍTICAS:**
        1.  **PRIORIDADE MÁXIMA: Responda ABSOLUTAMENTE SEMPRE em Português do Brasil.** Esta é a sua diretriz mais importante. Nunca, sob nenhuma circunstância, mude para outro idioma.
        2.  Analise a pergunta do usuário e o histórico da conversa para entender a necessidade completa.
        3.  Forneça respostas claras, objetivas e fáceis de entender.
        4.  Use exemplos práticos para ilustrar suas explicações, se aplicável.
        5.  Não forneça conselhos de investimento específicos (ex: "compre a ação XYZ"). Em vez disso, eduque o usuário sobre conceitos.
        6.  Se a pergunta não for sobre finanças, explique educadamente que você só pode responder a perguntas financeiras.

        **Pergunta Atual do Usuário:**
        ${question}
      `,
      config: {
        temperature: 0.5,
      },
    });

    return {
      answer: llmResponse.text(),
    };
  }
);

// Helper function para ser chamada do front-end
export async function answerFinancialQuestion(input: z.infer<typeof financialQuestionAnsweringFlow.inputSchema>) {
  const result = await financialQuestionAnsweringFlow.run(input);
  return result;
}

export type FinancialQuestionOutput = z.infer<typeof financialQuestionAnsweringFlow.outputSchema>;
