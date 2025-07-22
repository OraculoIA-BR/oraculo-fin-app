// 'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering user questions about their finances.
 * 
 * - answerFinancialQuestion - A function that takes a user's financial question as input and returns an informative answer.
 * - FinancialQuestionInput - The input type for the answerFinancialQuestion function.
 * - FinancialQuestionOutput - The return type for the answerFinancialQuestion function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialQuestionInputSchema = z.object({
  question: z.string().describe('The user\'s question about their finances.'),
});
export type FinancialQuestionInput = z.infer<typeof FinancialQuestionInputSchema>;

const FinancialQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the user\'s financial question.'),
});
export type FinancialQuestionOutput = z.infer<typeof FinancialQuestionOutputSchema>;

export async function answerFinancialQuestion(input: FinancialQuestionInput): Promise<FinancialQuestionOutput> {
  return financialQuestionAnsweringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialQuestionPrompt',
  input: {schema: FinancialQuestionInputSchema},
  output: {schema: FinancialQuestionOutputSchema},
  prompt: `You are a personal finance expert.  Answer the following question about the user\'s finances:

Question: {{{question}}}`,
});

const financialQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'financialQuestionAnsweringFlow',
    inputSchema: FinancialQuestionInputSchema,
    outputSchema: FinancialQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
