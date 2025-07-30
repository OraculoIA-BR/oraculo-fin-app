"use client";
import React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Loader2 } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CategoryCharts } from "@/components/dashboard/category-charts";
import { FinancialSearch } from "@/components/dashboard/financial-search";
import InsightsBox from "@/components/dashboard/InsightsBox";
import CashFlowTablePF from "@/components/dashboard/CashFlowTablePF";

export default function DashboardPage() {
  const { transactions, loading, error } = useTransactions();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">

        {/* Insights e Dicas sobre o histórico de transações */}
        <InsightsBox transactions={transactions} />

        {/* Busca financeira */}
        <FinancialSearch transactions={transactions} />

        {/* Tabela de Fluxo de Caixa Pessoal */}
        <CashFlowTablePF transactions={transactions} />

        {/* Cards financeiros */}
        <SummaryCards transactions={transactions} />

        {/* Gráficos de gastos e receitas lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <SpendingChart transactions={transactions} />
          <RevenueChart transactions={transactions} />
        </div>

        {/* Outros gráficos de categoria (opcional) */}
        <CategoryCharts transactions={transactions} />

        {/* Transações Recentes */}
        <div className="flex flex-col gap-6 w-full">
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}