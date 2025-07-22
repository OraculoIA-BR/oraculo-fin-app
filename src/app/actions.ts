'use server';

import { answerFinancialQuestion, type FinancialQuestionInput } from '@/ai/flows/financial-question-answering';

export async function handleFinancialQuestion(input: FinancialQuestionInput) {
  try {
    const output = await answerFinancialQuestion(input);
    return output;
  } catch (error) {
    console.error('Error in handleFinancialQuestion:', error);
    return { answer: 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.' };
  }
}
