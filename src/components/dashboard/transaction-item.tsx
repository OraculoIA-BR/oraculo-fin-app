// src/components/dashboard/transaction-item.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type Transaction } from "@/lib/firebase"; // Importa a interface
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TrendingUp, TrendingDown, Home, ShoppingCart, Utensils, Car, GraduationCap, HandCoins, PiggyBank } from "lucide-react";

// Mapeamento de categorias para ícones
const categoryIcons: { [key: string]: React.ReactNode } = {
  "Moradia": <Home className="h-5 w-5" />,
  "Supermercado": <ShoppingCart className="h-5 w-5" />,
  "Alimentação": <Utensils className="h-5 w-5" />,
  "Transporte": <Car className="h-5 w-5" />,
  "Educação": <GraduationCap className="h-5 w-5" />,
  "Salário": <HandCoins className="h-5 w-5" />,
  "Investimentos": <PiggyBank className="h-5 w-5" />,
  "Outros": <TrendingDown className="h-5 w-5" />,
};

// Define as props que o componente espera.
interface TransactionItemProps {
  transaction: Transaction;
}

/**
 * Exibe um único item de transação.
 */
export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';

  // Formata o valor monetário para o padrão brasileiro (BRL).
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: transaction.currency,
  }).format(transaction.amount);

  // Formata a data para um formato mais legível.
  const formattedDate = format(transaction.date, "dd 'de' MMM", { locale: ptBR });

  return (
    <div className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex bg-gray-100 text-gray-600">
        <AvatarFallback>
          {categoryIcons[transaction.category] || <TrendingDown className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>
      <div className="grid gap-1 flex-1">
        <p className="text-sm font-medium leading-none">{transaction.description}</p>
        <p className="text-sm text-muted-foreground">{transaction.category} - {formattedDate}</p>
      </div>
      <div className={`font-medium text-sm ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
        {isIncome ? `+${formattedAmount}` : formattedAmount}
      </div>
    </div>
  );
}
