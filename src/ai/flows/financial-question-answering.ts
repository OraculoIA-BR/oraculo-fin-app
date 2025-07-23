// 'use server';

/**
 * @fileOverview Este arquivo define um fluxo Genkit para responder a perguntas dos usuários sobre suas finanças.
 * 
 * - answerFinancialQuestion - Uma função que recebe a pergunta financeira de um usuário como entrada e retorna uma resposta informativa.
 * - FinancialQuestionInput - O tipo de entrada para a função answerFinancialQuestion.
 * - FinancialQuestionOutput - O tipo de retorno para a função answerFinancialQuestion.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialQuestionInputSchema = z.object({
  question: z.string().describe('A pergunta do usuário sobre suas finanças.'),
  userEmail: z.string().optional().describe('O e-mail do usuário para personalização.'),
});
export type FinancialQuestionInput = z.infer<typeof FinancialQuestionInputSchema>;

const FinancialQuestionOutputSchema = z.object({
  answer: z.string().describe('A resposta da IA para a pergunta financeira do usuário.'),
});
export type FinancialQuestionOutput = z.infer<typeof FinancialQuestionOutputSchema>;

export async function answerFinancialQuestion(input: FinancialQuestionInput): Promise<FinancialQuestionOutput> {
  const modifiedInput = {
    ...input,
    question: `${input.question} responda em português BR`,
  };
  return financialQuestionAnsweringFlow(modifiedInput);
}

const prompt = ai.definePrompt({
  name: 'financialQuestionPrompt',
  input: {schema: FinancialQuestionInputSchema},
  output: {schema: FinancialQuestionOutputSchema},
  prompt: `Você é um especialista em finanças pessoais. O usuário, identificado pelo e-mail {{userEmail}}, está fazendo a seguinte pergunta. Responda à seguinte pergunta sobre as finanças do usuário:

Pergunta: {{{question}}}`,
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
