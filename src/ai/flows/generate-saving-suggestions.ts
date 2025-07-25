// src/ai/flows/generate-saving-suggestions.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { gemini15Flash } from '@genkit-ai/googleai';

const GenerateSavingSuggestionsInputSchema = z.object({
  financialSituation: z
    .string()
    .describe(
      'Descrição da situação financeira atual do usuário (renda, despesas, etc.).'
    ),
  savingGoals: z
    .string()
    .describe('Os objetivos de economia do usuário (ex: comprar uma casa).'),
});
export type GenerateSavingSuggestionsInput = z.infer<
  typeof GenerateSavingSuggestionsInputSchema
>;

const GenerateSavingSuggestionsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      title: z.string().describe('O título da sugestão de economia.'),
      description: z.string().describe('Uma descrição detalhada da sugestão.'),
      example: z.string().describe('Um exemplo prático de como implementar a sugestão.'),
    })
  ).describe('Uma lista de sugestões de economia personalizadas.'),
});
export type GenerateSavingSuggestionsOutput = z.infer<
  typeof GenerateSavingSuggestionsOutputSchema
>;

/**
 * Gera sugestões de economia personalizadas com base na situação financeira do usuário.
 */
export async function generateSavingSuggestions(
  input: GenerateSavingSuggestionsInput
): Promise<GenerateSavingSuggestionsOutput> {

  const llmResponse = await ai.generate({
    model: gemini15Flash,
    prompt: `
      Você é um consultor financeiro. Sua tarefa é fornecer sugestões de economia
      personalizadas com base na situação financeira e metas do usuário.
      Forneça exemplos claros para cada sugestão.
      Responda sempre em Portugês do Brasil.

      **Situação Financeira:** 
      ${input.financialSituation}

      **Metas de Economia:** 
      ${input.savingGoals}

      Aqui estão algumas sugestões de economia para você:
    `,
    output: {
        schema: GenerateSavingSuggestionsOutputSchema,
    },
    config: {
      temperature: 0.7,
    },
  });

  // CORREÇÃO FINAL: O resultado agora é uma propriedade '.output', não um método.
  return llmResponse.output!;
}
