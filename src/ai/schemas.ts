import { z } from 'zod';

// Schema para uma única transação
export const transactionSchema = z.object({
  id: z.string(),
  amount: z.string(),
  currency: z.string(),
  category: z.string(),
  description: z.string(),
  timestamp: z.string(),
  transactionId: z.string(),
});

// Schema para as mensagens do chat
export const messageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// Schema para a entrada da pergunta financeira
export const financialQuestionSchema = z.object({
  question: z.string().min(2, "A pergunta deve ter pelo menos 2 caracteres."),
  history: z.array(messageSchema).optional(),
  userEmail: z.string().optional(),
  transactions: z.array(transactionSchema).optional(),
});

// Schema para a entrada de sugestões de economia
export const generateSavingSuggestionsInputSchema = z.object({
  financialSituation: z.string(),
  savingGoals: z.string(),
});