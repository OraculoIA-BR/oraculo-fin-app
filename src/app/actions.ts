'use server';

import { answerFinancialQuestion, type FinancialQuestionInput } from '@/ai/flows/financial-question-answering';
import { sendAlerts } from '@/lib/alerts';

export async function handleFinancialQuestion(input: FinancialQuestionInput) {
  try {
    const output = await answerFinancialQuestion(input);
    return output;
  } catch (error) {
    console.error('Error in handleFinancialQuestion:', error);
    return { answer: 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.' };
  }
}

export async function handleSubscribeToAlerts(email: string) {
    try {
        await sendAlerts(email);
        return { success: true };
    } catch (error) {
        console.error('Error in handleSubscribeToAlerts:', error);
        return { success: false, error: 'Ocorreu um erro ao se inscrever para os alertas.' };
    }
}
