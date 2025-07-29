"use client";
import React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Loader2 } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CategoryCharts } from "@/components/dashboard/category-charts";
import { FinancialSearch } from "@/components/dashboard/financial-search";

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
      {/* Passa as transações para o componente de busca financeira */}
      <FinancialSearch transactions={transactions} />
      
      <SummaryCards transactions={transactions} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <SpendingChart transactions={transactions} />
          <CategoryCharts transactions={transactions} />
        </div>
        <div className="lg:col-span-3"></div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentTransactions transactions={transactions} />
        <div />
      </div>
    </DashboardLayout>
  );
}