// src/app/actions.ts
'use server';

import { answerFinancialQuestion } from '@/ai/flows/financial-question-answering';
import { z } from 'zod';

const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// CORREÇÃO: Adicionado 'userEmail' ao schema para corresponder aos dados enviados pelo cliente.
const financialQuestionSchema = z.object({
  question: z.string().min(1, 'A pergunta não pode estar vazia.'),
  history: z.array(messageSchema).optional(),
  userEmail: z.string().optional(),
});

/**
 * Server Action para lidar com perguntas financeiras do usuário.
 */
export async function handleFinancialQuestion(input: z.infer<typeof financialQuestionSchema>) {
  // Adicionando um log para depurar a entrada.
  console.log("Input recebido na Server Action:", input);

  const validatedInput = financialQuestionSchema.safeParse(input);

  if (!validatedInput.success) {
    console.error('Erro de validação do Zod:', validatedInput.error.flatten().fieldErrors);
    throw new Error('Entrada inválida para a pergunta financeira.');
  }

  // A partir daqui, usamos `validatedInput.data` que contém os dados limpos.
  const result = await answerFinancialQuestion(validatedInput.data);
  return result;
}
