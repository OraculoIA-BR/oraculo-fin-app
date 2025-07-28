// src/app/actions.ts
'use server';

import { answerFinancialQuestion, type FinancialQuestionOutput } from '@/ai/flows/financial-question-answering';
import { generateSavingSuggestions, type GenerateSavingSuggestionsOutput } from '@/ai/flows/generate-saving-suggestions';
import { z } from 'zod';

// --- Schema para o fluxo de Perguntas e Respostas ---
const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const financialQuestionSchema = z.object({
  question: z.string(),
  history: z.array(messageSchema).optional(),
  userEmail: z.string().optional(),
});

/**
 * Server Action para lidar com perguntas financeiras do usuário.
 */
export async function handleFinancialQuestion(
  input: z.infer<typeof financialQuestionSchema>
): Promise<FinancialQuestionOutput> {
  try {
    const validatedInput = financialQuestionSchema.safeParse(input);
    if (!validatedInput.success) {
      throw new Error('Entrada inválida para a pergunta financeira.');
    }
    
    const result = await answerFinancialQuestion(validatedInput.data);
    
    if (!result || typeof result.answer !== 'string') {
        return { answer: '[⚠️ Ocorreu um erro interno na IA. O resultado retornado era inválido.]' };
    }
    return result;
  } catch (error) {
    console.error('[ACTION ERROR - handleFinancialQuestion]:', error);
    return { 
      answer: "[⚠️ Desculpe, o serviço de IA encontrou um erro crítico. Verifique os logs do servidor.]" 
    };
  }
}

// --- Schema para o fluxo de Sugestões de Economia ---
const generateSavingSuggestionsInputSchema = z.object({
  financialSituation: z.string(),
  savingGoals: z.string(),
});

/**
 * Server Action para buscar sugestões de economia.
 * Esta função roda exclusivamente no servidor.
 */
export async function getSuggestionsAction(
  input: z.infer<typeof generateSavingSuggestionsInputSchema>
): Promise<GenerateSavingSuggestionsOutput> {
  try {
    const validatedInput = generateSavingSuggestionsInputSchema.safeParse(input);
    if (!validatedInput.success) {
      throw new Error('Entrada inválida para sugestão de economia.');
    }
    const result = await generateSavingSuggestions(validatedInput.data);
    return result;
  } catch (error) {
    console.error('[ACTION ERROR - getSuggestionsAction]:', error);
    // Retorna um objeto válido mesmo em caso de erro para não quebrar o frontend.
    return { suggestions: [] };
  }
}
