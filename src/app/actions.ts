'use server';

import { answerFinancialQuestion } from '@/ai/flows/financial-question-answering';
import { z } from 'zod';

// Esquema para o histórico da conversa, precisa ser idêntico ao do fluxo
const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// O esquema de input para a nossa Server Action
const financialQuestionSchema = z.object({
  question: z.string(),
  history: z.array(messageSchema).optional(),
});

/**
 * Esta é uma Server Action que pode ser chamada de forma segura
 * a partir de componentes de cliente para interagir com o fluxo de IA.
 * @param input O objeto contendo a pergunta do usuário e o histórico da conversa.
 * @returns A resposta da IA.
 */
export async function handleFinancialQuestion(input: z.infer<typeof financialQuestionSchema>) {
  // Validamos a entrada para garantir que ela está no formato correto
  const validatedInput = financialQuestionSchema.safeParse(input);

  if (!validatedInput.success) {
    throw new Error('Entrada inválida para a pergunta financeira.');
  }

  // Chamamos o nosso fluxo de IA com os dados validados
  const result = await answerFinancialQuestion(validatedInput.data);
  return result;
}
