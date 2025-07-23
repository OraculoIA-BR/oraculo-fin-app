'use server';

/**
 * @fileOverview Agente de IA que gera sugestões de economia personalizadas.
 *
 * - generateSavingSuggestions - Uma função que gera sugestões de economia para o usuário.
 * - GenerateSavingSuggestionsInput - O tipo de entrada para a função generateSavingSuggestions.
 * - GenerateSavingSuggestionsOutput - O tipo de retorno para a função generateSavingSuggestions.
 */

import { generate } from '@genkit-ai/ai';
import { z } from 'zod';
import { gemini15Pro } from '@genkit-ai/googleai';


const GenerateSavingSuggestionsInputSchema = z.object({
  financialSituation: z
    .string()
    .describe(
      'Descrição da situação financeira atual do usuário, incluindo renda, despesas, dívidas e economias.'
    ),
  savingGoals: z
    .string()
    .describe('Os objetivos de economia do usuário, por exemplo, comprar uma casa, aposentar-se mais cedo, etc.'),
});
export type GenerateSavingSuggestionsInput = z.infer<
  typeof GenerateSavingSuggestionsInputSchema
>;

const GenerateSavingSuggestionsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      title: z.string().describe('O título da sugestão de economia.'),
      description: z.string().describe('Uma descrição detalhada da sugestão.'),
      example: z.string().describe('Um exemplo de como implementar a sugestão.'),
    })
  ).describe('Uma lista de sugestões de economia personalizadas.'),
});
export type GenerateSavingSuggestionsOutput = z.infer<
  typeof GenerateSavingSuggestionsOutputSchema
>;

/**
 * Gera sugestões de economia personalizadas.
 * @param input Objeto contendo a situação financeira e os objetivos do usuário.
 * @returns Uma lista de sugestões.
 */
export async function generateSavingSuggestions(
  input: GenerateSavingSuggestionsInput
): Promise<GenerateSavingSuggestionsOutput> {

  const llmResponse = await generate({
    model: gemini15Pro,
    prompt: `
      Você é um consultor financeiro pessoal. Seu objetivo é fornecer sugestões de economia personalizadas para o usuário,
      com base em sua situação financeira e metas de economia. Forneça exemplos claros de como implementar cada sugestão.
      Responda sempre em Português do Brasil.

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

  return llmResponse.output()!;
}
