import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { SummaryCard } from './summary-card';
import { type Transaction } from "@/services/transactionService";
import { useMemo } from 'react';

interface SummaryCardsProps {
  transactions: Transaction[];
}

function safeParseFloat(value: any): number {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

// Função robusta para comparar mês/ano, independente do timezone
function isSameMonthAndYear(dateA: Date, dateB: Date): boolean {
  return (
    dateA.getUTCMonth() === dateB.getUTCMonth() &&
    dateA.getUTCFullYear() === dateB.getUTCFullYear()
  );
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const summaryData = useMemo(() => {
    const now = new Date();
    let balance = 0;
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
      const amount = safeParseFloat(transaction.amount);

      // Tenta criar a data corretamente, aceitando timestamp numérico ou string
      let transactionDate: Date;
      if (typeof transaction.timestamp === "number") {
        transactionDate = new Date(transaction.timestamp);
      } else if (typeof transaction.timestamp === "string") {
        // Suporta formatos ISO, yyyy-mm-dd, etc
        const parsed = Date.parse(transaction.timestamp);
        transactionDate = isNaN(parsed) ? now : new Date(parsed);
      } else {
        transactionDate = now;
      }

      balance += amount;

      if (isSameMonthAndYear(transactionDate, now)) {
        if (amount > 0) {
          income += amount;
        } else if (amount < 0) {
          expenses += Math.abs(amount);
        }
      }
    });

    return {
      balance,
      income,
      expenses,
    };
  }, [transactions]);

  const cards = [
    {
      title: "Saldo Atual",
      value: summaryData.balance,
      icon: <DollarSign className="h-4 w-4 text-gray-500" />,
      description: "Seu dinheiro disponível agora",
    },
    {
      title: "Receitas do Mês",
      value: summaryData.income,
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      description: "Receitas recebidas este mês",
    },
    {
      title: "Despesas do Mês",
      value: summaryData.expenses,
      icon: <TrendingDown className="h-4 w-4 text-red-500" />,
      description: "Despesas pagas este mês",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((data, index) => (
        <SummaryCard
          key={index}
          title={data.title}
          value={
            isNaN(data.value)
              ? "R$ 0,00"
              : data.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          }
          icon={data.icon}
          description={data.description}
        />
      ))}
    </div>
  );
}