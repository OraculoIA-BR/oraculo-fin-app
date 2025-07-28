"use client";
import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CategoryCharts } from "@/components/dashboard/category-charts";
import { FinancialSearch } from "@/components/dashboard/financial-search";
// --- INÍCIO DA ADIÇÃO ---
import { getTransactions, type Transaction } from "@/lib/firebase";
// --- FIM DA ADIÇÃO ---

export default function DashboardPage() {
  const { user } = useAuth();
  // --- INÍCIO DA ADIÇÃO ---
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  // --- FIM DA ADIÇÃO ---

  useEffect(() => {
    // Busca os dados apenas se o usuário estiver autenticado.
    if (user) {
      getTransactions(user.uid)
        .then(data => {
          setTransactions(data);
        })
        .catch(error => {
          console.error("Falha ao carregar dados do dashboard:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Se não houver usuário, para de carregar.
      setLoading(false);
    }
  }, [user]); // Roda o efeito sempre que o objeto 'user' mudar.

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

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
        {/* Passa as transações reais para o componente */}
        <RecentTransactions transactions={transactions} />
        {/* O componente de sugestões será implementado futuramente */}
        <div /> 
      </div>
    </DashboardLayout>
  );
}
