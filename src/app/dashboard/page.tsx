// src/app/dashboard/page.tsx
"use client";
import React from 'react';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SavingSuggestions } from '@/components/dashboard/saving-suggestions';
import { FinancialSearch } from '@/components/dashboard/financial-search';
import { CategoryCharts } from '@/components/dashboard/category-charts';
import { generateSavingSuggestions, type GenerateSavingSuggestionsOutput } from '@/ai/flows/generate-saving-suggestions';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Loader2 } from 'lucide-react';

// Função para buscar sugestões de economia da IA.
// Os dados foram mocados para fins de demonstração.
async function getSavingSuggestions(): Promise<GenerateSavingSuggestionsOutput> {
  return generateSavingSuggestions({
    financialSituation: 'Renda mensal de R$5000, despesas fixas de R$2500, despesas variáveis de R$1500.',
    savingGoals: 'Comprar um carro novo em 2 anos e fazer uma viagem internacional.',
  });
}

export default function DashboardPage() {
  const [suggestions, setSuggestions] = React.useState<GenerateSavingSuggestionsOutput['suggestions']>([]);
  const [dataLoading, setDataLoading] = React.useState(true);

  // Busca as sugestões de economia quando o componente é montado.
  React.useEffect(() => {
    getSavingSuggestions()
      .then(output => setSuggestions(output.suggestions))
      .finally(() => setDataLoading(false));
  }, []);

  // Exibe um loader enquanto os dados da IA estão sendo carregados.
  if (dataLoading) {
    return (
      <DashboardLayout>
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-gray-500">Analisando suas finanças...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Seu Painel Financeiro</h1>
      <div className="grid gap-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
          <RecentTransactions />
        </div>
        <FinancialSearch />
        <SummaryCards />
        <SavingSuggestions suggestions={suggestions} />
        <CategoryCharts />
      </div>
    </DashboardLayout>
  );
}
