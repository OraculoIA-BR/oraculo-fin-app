import { generateSavingSuggestions, type GenerateSavingSuggestionsOutput } from '@/ai/flows/generate-saving-suggestions';
import { Logo } from '@/components/logo';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { FinancialSearch } from '@/components/dashboard/financial-search';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SavingSuggestions } from '@/components/dashboard/saving-suggestions';
import { WhatsAppFAB } from '@/components/dashboard/whatsapp-fab';

export default async function Home() {
  // Fetch AI suggestions on the server
  const savingSuggestions: GenerateSavingSuggestionsOutput = await generateSavingSuggestions({
    financialSituation: 'Renda mensal de R$5000, despesas fixas de R$2500, despesas variáveis de R$1500.',
    savingGoals: 'Comprar um carro novo em 2 anos e fazer uma viagem internacional.',
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-auto" />
            <h1 className="text-2xl font-bold tracking-tight text-primary sr-only">
              Oráculo
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 container mx-auto">
        <div className="grid gap-6 md:gap-8">
          <SummaryCards />
          
          <div className="grid gap-6 md:gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-6">
              <FinancialSearch />
              <RecentTransactions />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <SpendingChart />
            </div>
          </div>
          
          <SavingSuggestions suggestions={savingSuggestions.suggestions} />
        </div>
      </main>
      <WhatsAppFAB />
    </div>
  );
}
