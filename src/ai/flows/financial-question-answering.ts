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

export async function answerFinancialQuestion(
  input: z.infer<typeof financialQuestionSchema>
): Promise<FinancialQuestionOutput> {
  try {
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
        O usuário está logado com o e-mail: ${input.userEmail}.
        Responda sempre em Português do Brasil.
        Pergunta: ${input.question}
      `,
      config: {
        temperature: 0.5,
      },
    });

    const answer = llmResponse.text();

    if (!answer) {
      return { answer: "[⚠️ A IA não forneceu uma resposta. Tente reformular a pergunta.]" };
    }

    return { answer };

  } catch (error) {
    console.error("ERRO CRÍTICO NO FLUXO DE IA:", error);
    return { 
      answer: "Desculpe, ocorreu um erro de comunicação com o serviço de IA. Verifique as configurações de API ou a sua cota de uso e tente novamente." 
    };
  }
}