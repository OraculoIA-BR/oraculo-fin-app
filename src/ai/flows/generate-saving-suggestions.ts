'use server';

/**
 * @fileOverview AI agent that generates personalized saving suggestions.
 *
 * - generateSavingSuggestions - A function that generates saving suggestions for the user.
 * - GenerateSavingSuggestionsInput - The input type for the generateSavingSuggestions function.
 * - GenerateSavingSuggestionsOutput - The return type for the generateSavingSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSavingSuggestionsInputSchema = z.object({
  financialSituation: z
    .string()
    .describe(
      'Description of the user current financial situation, including income, expenses, debts, and savings.'
    ),
  savingGoals: z
    .string()
    .describe('The user saving goals, for example, buying a house, retiring early, etc.'),
});
export type GenerateSavingSuggestionsInput = z.infer<
  typeof GenerateSavingSuggestionsInputSchema
>;

const GenerateSavingSuggestionsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      title: z.string().describe('The title of the saving suggestion.'),
      description: z.string().describe('A detailed description of the suggestion.'),
      example: z.string().describe('An example of how to implement the suggestion.'),
    })
  ).describe('A list of personalized saving suggestions.'),
});
export type GenerateSavingSuggestionsOutput = z.infer<
  typeof GenerateSavingSuggestionsOutputSchema
>;

export async function generateSavingSuggestions(
  input: GenerateSavingSuggestionsInput
): Promise<GenerateSavingSuggestionsOutput> {
  return generateSavingSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSavingSuggestionsPrompt',
  input: {schema: GenerateSavingSuggestionsInputSchema},
  output: {schema: GenerateSavingSuggestionsOutputSchema},
  prompt: `You are a personal finance advisor. Your goal is to provide personalized saving suggestions to the user, 
based on their financial situation and saving goals. Provide clear examples of how to implement each suggestion.

Financial Situation: {{{financialSituation}}}
Saving Goals: {{{savingGoals}}}

Here are some saving suggestions for you:
`,
});

const generateSavingSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSavingSuggestionsFlow',
    inputSchema: GenerateSavingSuggestionsInputSchema,
    outputSchema: GenerateSavingSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
