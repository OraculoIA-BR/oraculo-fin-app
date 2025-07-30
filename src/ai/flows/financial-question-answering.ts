"use server";

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { financialQuestionSchema } from '@/ai/schemas';
// Importa o modelo Gemini 2.0 Flash do Vertex AI (disponível)
import { gemini20Flash } from '@genkit-ai/vertexai';

export type FinancialQuestionInput = z.infer<typeof financialQuestionSchema>;
export type FinancialQuestionOutput = {
  answer: string;
};

export async function answerFinancialQuestion(
  input: FinancialQuestionInput
): Promise<FinancialQuestionOutput> {
  // Prepara histórico para o LLM
  const genkitHistory =
    input.history?.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })) || [];

  // Prepara contexto de transações se houver
  const transactionsContext = Array.isArray(input.transactions) && input.transactions.length > 0
    ? `
**Histórico de Transações do Usuário (para contexto):**
${JSON.stringify(input.transactions, null, 2)}
`
    : 'Nenhum histórico de transações foi fornecido.';

  // Prompt para o modelo Gemini 2.0 Flash via Vertex AI
  const llmResponse = await ai.generate({
    model: gemini20Flash,
    history: genkitHistory,
    prompt: `
      Você é Oráculo, um especialista em finanças pessoais.
      Sua tarefa é responder a perguntas sobre as finanças do usuário com base em seu histórico de transações.
      O usuário está logado com o e-mail: ${input.userEmail ?? "desconhecido"}.
      **REGRAS:**
      1. Responda sempre em Português do Brasil.
      2. Seja claro, objetivo, amigável.
      3. Use os dados das transações para fundamentar suas respostas, se disponíveis.
      4. Se a pergunta não for sobre finanças, recuse educadamente.
      5. Responda de forma RESUMIDA (máximo 5 linhas).
      6. Não invente informações; baseie-se apenas nos dados fornecidos.
      ${transactionsContext}
      **Pergunta do Usuário:**
      ${input.question}
    `,
    config: {
      temperature: 0.3,
    },
  });

  // Vertex AI retorna 'text' como propriedade
  const answer = llmResponse?.text;

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