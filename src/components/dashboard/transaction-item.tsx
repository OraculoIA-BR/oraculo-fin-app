import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { type Transaction } from '@/services/transactionService';

interface TransactionItemProps {
  transaction: Transaction;
}

/**
 * Exibe um único item de transação, agora mais robusto a dados incompletos.
 */
export function TransactionItem({ transaction }: TransactionItemProps) {
  // Converte o valor para número. Se falhar, usa 0.
  const amount = parseFloat(transaction.amount) || 0;
  const isIncome = amount > 0;
  // Define 'BRL' como fallback caso a moeda não seja fornecida.
  const currencyCode = transaction.currency || 'BRL';
  // Formata o valor monetário para o padrão brasileiro.
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
  // Formata a data para um formato mais legível.
  const formattedDate = new Date(transaction.timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
          {isIncome ? (
            <ArrowUpRight className="h-5 w-5 text-green-600" />
          ) : (
            <ArrowDownLeft className="h-5 w-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{transaction.description}</p>
          <p className="text-sm text-gray-500">{transaction.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
          {formattedAmount}
        </p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
}