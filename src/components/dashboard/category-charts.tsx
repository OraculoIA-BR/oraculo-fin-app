"use client";
import React, { useMemo, useState } from 'react';
import { Car, Utensils, Shirt, Home, ShoppingCart, HeartPulse, GraduationCap, CircleDollarSign } from 'lucide-react';
import { CategoryChart } from './category-chart';
import { type Transaction } from "@/services/transactionService";

// Mapeamento de categorias para ícones
const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  "Transporte": Car,
  "Alimentação": Utensils,
  "Moradia": Home,
  "Compras": ShoppingCart,
  "Saúde": HeartPulse,
  "Educação": GraduationCap,
  "Lazer": Shirt, // Usando o ícone de vestuário para Lazer por enquanto
  "Outros": CircleDollarSign,
};

interface CategoryChartsProps {
  transactions: Transaction[];
}

const CHARTS_PER_PAGE = 6;
const MONTHS_TO_SHOW = 6;

function getLastMonths(referenceDate: Date, count: number): string[] {
  // Retorna array de meses "mmm/yyyy" do mais antigo ao mais recente
  const months: string[] = [];
  const d = new Date(referenceDate);
  d.setDate(1); // Garantir início do mês
  for (let i = count - 1; i >= 0; i--) {
    const dt = new Date(d);
    dt.setMonth(dt.getMonth() - i);
    months.push(`${dt.toLocaleString('default', { month: 'short' })}/${dt.getFullYear()}`);
  }
  return months;
}

export function CategoryCharts({ transactions }: CategoryChartsProps) {
  // Estado da página atual para paginação
  const [page, setPage] = useState(0);

  // Referência para os últimos 6 meses: mês mais recente presente nos dados
  const mostRecentDate = useMemo(() => {
    if (transactions.length === 0) return new Date();
    return transactions
      .map(t => new Date(t.timestamp))
      .reduce((max, curr) => (curr > max ? curr : max), new Date(transactions[0].timestamp));
  }, [transactions]);

  // Lista dos últimos 6 meses, do mais antigo ao mais recente
  const lastMonths = useMemo(() => getLastMonths(mostRecentDate, MONTHS_TO_SHOW), [mostRecentDate]);

  // Agrupa despesas por categoria e mês
  const categoryData = useMemo(() => {
    // 1. Filtra apenas despesas (valores negativos)
    const expenses = transactions.filter(t => parseFloat(t.amount) < 0);

    // 2. Agrupa por categoria e mês
    const dataByCategory: Record<string, Record<string, number>> = {};
    expenses.forEach(transaction => {
      const category = transaction.category || "Outros";
      const amount = Math.abs(parseFloat(transaction.amount));
      const dateObj = new Date(transaction.timestamp);
      const month = `${dateObj.toLocaleString('default', { month: 'short' })}/${dateObj.getFullYear()}`;
      if (!dataByCategory[category]) dataByCategory[category] = {};
      if (!dataByCategory[category][month]) dataByCategory[category][month] = 0;
      dataByCategory[category][month] += amount;
    });

    // 3. Prepara os dados para cada categoria: sempre mostra os últimos 6 meses
    return Object.entries(dataByCategory).map(([category, monthlyData]) => ({
      title: category,
      icon: CATEGORY_ICONS[category] || CircleDollarSign,
      data: lastMonths.map(month => ({
        name: month,
        value: monthlyData[month] || 0,
      })),
    }));
  }, [transactions, lastMonths]);

  // Paginação dos gráficos
  const pageCount = Math.ceil(categoryData.length / CHARTS_PER_PAGE);
  const pagedCharts = categoryData.slice(
    page * CHARTS_PER_PAGE,
    page * CHARTS_PER_PAGE + CHARTS_PER_PAGE
  );

  if (categoryData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 col-span-full">
        <p>Nenhuma despesa para analisar por categoria.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-blue-900 mb-4 col-span-full">Análise por Categoria (últimos 6 meses)</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-full">
        {pagedCharts.map(chart => (
          <CategoryChart key={chart.title} title={chart.title} data={chart.data} icon={chart.icon} />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 col-span-full">
          <button
            className="px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold disabled:opacity-40"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            &larr; Anterior
          </button>
          <span className="text-sm font-medium text-gray-600 mx-2">
            Página {page + 1} de {pageCount}
          </span>
          <button
            className="px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold disabled:opacity-40"
            onClick={() => setPage(page + 1)}
            disabled={page === pageCount - 1}
          >
            Próxima &rarr;
          </button>
        </div>
      )}
    </>
  );
}