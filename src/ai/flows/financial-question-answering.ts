import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { gemini15Flash } from '@genkit-ai/googleai';

const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const financialQuestionSchema = z.object({
  question: z.string(),
  history: z.array(messageSchema).optional(),
  userEmail: z.string().optional(),
});

export type FinancialQuestionOutput = {
  answer: string;
};

/**
 * Interage com a IA para responder a perguntas financeiras.
 */
export async function answerFinancialQuestion(
  input: z.infer<typeof financialQuestionSchema>
): Promise<FinancialQuestionOutput> {
  const genkitHistory =
    input.history?.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })) || [];

  const llmResponse = await ai.generate({
    model: gemini15Flash,
    history: genkitHistory,
    prompt: `
      Você é Oráculo, um especialista em finanças pessoais.
      Sua tarefa é responder a perguntas sobre as finanças do usuário.
      O usuário está logado com o e-mail: ${input.userEmail}.

      **REGRAS:**
      1.  Responda sempre em Português do Brasil.
      2.  Seja claro e objetivo.
      3.  Se a pergunta não for sobre finanças, recuse educadamente.

      **Pergunta do Usuário:**
      ${input.question}
    `,
    config: {
      temperature: 0.5,
    },
  });

  // Log para depuração
  console.log("DEBUG - Resposta completa da IA:", JSON.stringify(llmResponse, null, 2));

  // Use o campo output (conforme API mais recente do Genkit)
  return {
    answer: llmResponse.output as string,
  };
}