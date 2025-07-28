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

    // --- INÍCIO DA CORREÇÃO FINAL ---
    // Ajusta o caminho para corresponder à estrutura de resposta real do log.
    const answer = llmResponse?.custom?.candidates?.[0]?.content?.parts?.[0]?.text;
    // --- FIM DA CORREÇÃO FINAL ---

    if (!answer) {
      console.warn("Não foi possível extrair o texto da resposta da IA. Resposta completa:", JSON.stringify(llmResponse, null, 2));
      return { answer: "[⚠️ A IA não forneceu uma resposta em um formato esperado.]" };
    }

    console.log('DEBUG - Resposta entregue ao frontend:', answer);
    return { answer };

  } catch (error) {
    console.error("ERRO CRÍTICO NO FLUXO DE IA:", error);
    return { 
      answer: "Desculpe, ocorreu um erro de comunicação com o serviço de IA. Verifique as configurações de API ou a sua cota de uso e tente novamente." 
    };
  }
}
