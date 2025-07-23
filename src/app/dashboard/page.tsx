"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SavingSuggestions } from '@/components/dashboard/saving-suggestions';
import { FinancialSearch } from '@/components/dashboard/financial-search';
import { WhatsAppFAB } from '@/components/dashboard/whatsapp-fab';
import { CategoryCharts } from '@/components/dashboard/category-charts'; // Importando os novos gráficos
import { generateSavingSuggestions, type GenerateSavingSuggestionsOutput } from '@/ai/flows/generate-saving-suggestions';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';

// Placeholder. Em um app real, isso viria do backend.
async function getSavingSuggestions(): Promise<GenerateSavingSuggestionsOutput> {
  return generateSavingSuggestions({
    financialSituation: 'Renda mensal de R$5000, despesas fixas de R$2500, despesas variáveis de R$1500.',
    savingGoals: 'Comprar um carro novo em 2 anos e fazer uma viagem internacional.',
  });
}


export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = React.useState<GenerateSavingSuggestionsOutput['suggestions']>([]);
  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    // A verificação de login foi desativada para desenvolvimento.
  }, [user, loading, router]);


  React.useEffect(() => {
    // A verificação de usuário foi removida para carregar os dados de exemplo.
    getSavingSuggestions()
      .then(output => setSuggestions(output.suggestions))
      .finally(() => setDataLoading(false));
  }, []);

  if (loading || dataLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Logo />
        <Loader2 className="h-10 w-10 animate-spin text-primary mt-4" />
        <p className="text-gray-500 mt-2">Carregando seu dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <Logo />
            {/* Aqui você pode adicionar um menu de usuário ou botão de logout no futuro */}
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">Seu Painel Financeiro</h1>
          <div className="grid gap-8">
            {/* 1. Gráfico de Despesas e Transações Recentes */}
            <div className="grid md:grid-cols-2 gap-6">
              <SpendingChart />
              <RecentTransactions />
            </div>

            {/* 2. Chat com a IA */}
            <FinancialSearch />

            {/* 3. Cards de Saldo, Receita e Despesas */}
            <SummaryCards />

            {/* 4. Dicas de Economia */}
            <SavingSuggestions suggestions={suggestions} />

            {/* 5. Novos Gráficos por Categoria */}
            <CategoryCharts />
          </div>
        </div>
      </main>
      <WhatsAppFAB />
    </div>
  );
}
