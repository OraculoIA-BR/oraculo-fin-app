// src/components/dashboard/summary-cards.tsx
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { SummaryCard } from './summary-card';

/**
 * Exibe os cartões de resumo com os principais indicadores financeiros.
 * Utiliza o componente reutilizável `SummaryCard` para cada indicador.
 */
export function SummaryCards() {
  const summaryData = [
    {
      title: "Saldo Atual",
      value: 5842.25,
      icon: <DollarSign className="h-4 w-4 text-gray-500" />,
      description: "Seu dinheiro disponível agora",
    },
    {
      title: "Receitas do Mês",
      value: 7500.00,
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      description: "+15% em relação ao mês passado",
    },
    {
      title: "Despesas do Mês",
      value: 1657.75,
      icon: <TrendingDown className="h-4 w-4 text-red-500" />,
      description: "-5% em relação ao mês passado",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {summaryData.map((data, index) => (
        <SummaryCard
          key={index}
          title={data.title}
          value={data.value}
          icon={data.icon}
          description={data.description}
        />
      ))}
    </div>
  );
}
