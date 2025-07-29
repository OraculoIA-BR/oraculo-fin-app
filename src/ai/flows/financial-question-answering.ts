"use server";

import { gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';
import { financialQuestionSchema } from '@/ai/schemas';
import { ai } from '../genkit';

// Define o tipo de entrada a partir do schema importado
export type FinancialQuestionInput = z.infer<typeof financialQuestionSchema>;

// Define um tipo de saída claro e simples
export type FinancialQuestionOutput = {
  answer: string;
};

/**
 * Função principal que consulta a IA e retorna a resposta.
 * Exporta somente a função async, sem objetos ou schemas.
 */
export async function answerFinancialQuestion(
  input: FinancialQuestionInput
): Promise<FinancialQuestionOutput> {
  const genkitHistory =
    input.history?.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })) || [];

  const transactionsContext = input.transactions
    ? `
**Histórico de Transações do Usuário (para contexto):**
${JSON.stringify(input.transactions, null, 2)}
`
    : 'Nenhum histórico de transações foi fornecido.';

  const llmResponse = await ai.generate({
    model: gemini15Flash,
    history: genkitHistory,
    prompt: `
      Você é Oráculo, um especialista em finanças pessoais.
      Sua tarefa é responder a perguntas sobre as finanças do usuário com base em seu histórico de transações.
      O usuário está logado com o e-mail: ${input.userEmail}.
      **REGRAS:**
      1. Responda sempre em Português do Brasil.
      2. Seja claro, objetivo e amigável.
      3. Use os dados das transações para fundamentar suas respostas.
      4. Se a pergunta não for sobre finanças, recuse educadamente.
      5. Não invente informações; baseie-se apenas nos dados fornecidos.
      ${transactionsContext}
      **Pergunta do Usuário:**
      ${input.question}
    `,
    config: {
      temperature: 0.3,
    },
  });

  const answer = llmResponse?.text();

  if (!answer) {
    console.warn(
      'Não foi possível extrair o texto da resposta da IA. Resposta completa:',
      JSON.stringify(llmResponse, null, 2)
    );
    return {
      answer: '[⚠️ A IA não forneceu uma resposta em um formato esperado.]',
    };
  }

  return { answer };
}