"use client";
import React from "react";
import { SavingSuggestions } from "@/components/dashboard/saving-suggestions";
import { FinancialSearch } from "@/components/dashboard/financial-search";
import { CategoryCharts } from "@/components/dashboard/category-charts";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Loader2 } from "lucide-react";
import { getSuggestionsAction } from "@/app/actions";
import type { GenerateSavingSuggestionsOutput } from "@/ai/flows/generate-saving-suggestions";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

export default function DashboardPage() {
  const [suggestions, setSuggestions] = React.useState<
    GenerateSavingSuggestionsOutput["suggestions"]
  >([]);
  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    // Chama a Server Action, que é segura para ser usada em componentes de cliente.
    getSuggestionsAction({
      financialSituation:
        "Renda mensal de R$5000, despesas fixas de R$2500, despesas variáveis de R$1500.",
      savingGoals:
        "Comprar um carro novo em 2 anos e fazer uma viagem internacional.",
    })
      .then((output) => {
        if (output && output.suggestions) {
          setSuggestions(output.suggestions);
        } else {
          setSuggestions([]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch saving suggestions via action:", error);
        setSuggestions([]);
      })
      .finally(() => setDataLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <FinancialSearch />
      <SummaryCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <SpendingChart />
        </div>
        <div className="lg:col-span-3">
          <CategoryCharts />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecentTransactions />
        {dataLoading ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              Carregando sugestões de economia...
            </span>
          </div>
        ) : (
          <SavingSuggestions suggestions={suggestions} />
        )}
      </div>
    </DashboardLayout>
  );
}
