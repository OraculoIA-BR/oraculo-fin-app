"use server";

import {
  financialQuestionSchema,
  generateSavingSuggestionsInputSchema,
} from '@/ai/schemas';
import {
  answerFinancialQuestion,
  type FinancialQuestionOutput,
} from '@/ai/flows/financial-question-answering';
import {
  generateSavingSuggestions,
  type GenerateSavingSuggestionsOutput,
} from '@/ai/flows/generate-saving-suggestions';
import { z } from 'zod';

/**
 * Server Action para lidar com perguntas financeiras do usuário.
 */
export async function handleFinancialQuestion(
  input: z.infer<typeof financialQuestionSchema>
): Promise<FinancialQuestionOutput> {
  try {
    // Aceita objetos sem campos opcionais, desde que haja "question"
    const validatedInput = financialQuestionSchema.safeParse(input);
    if (!validatedInput.success) {
      // Coleta erros do Zod para debug mais fácil
      const errorDetails = JSON.stringify(validatedInput.error.issues, null, 2);
      throw new Error(`Entrada inválida para a pergunta financeira. Detalhes: ${errorDetails}`);
    }
    const result = await answerFinancialQuestion(validatedInput.data);
    if (!result || typeof result.answer !== 'string') {
      return { answer: '[⚠️ Ocorreu um erro interno na IA. O resultado retornado era inválido.]' };
    }
    return result;
  } catch (error: any) {
    console.error('[ACTION ERROR - handleFinancialQuestion]:', error);
    return {
      answer: "[⚠️ Desculpe, o serviço de IA encontrou um erro crítico. Verifique os logs do servidor.]"
    };
  }
}

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
    return { suggestions: [] };
  }
}