"use client";
import React, { useMemo, useState } from "react";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Transaction } from "@/services/transactionService";

// Paleta fixa para categorias principais (igual despesas)
const BASE_CATEGORY_COLORS: Record<string, string> = {
  "Salário": "#fbbf24",
  "Freela": "#38bdf8",
  "Investimento": "#10b981",
  "Rendimento": "#f472b6",
  "Outros": "#9ca3af",
  // Pode adicionar mais categorias específicas se quiser
};

// Gera cor para categoria extra
function generateColor(idx: number): string {
  const palette = [
    "#22d3ee", "#a3e635", "#f43f5e", "#fbbf24", "#c026d3",
    "#0ea5e9", "#eab308", "#84cc16", "#ef4444", "#ea580c",
    "#14b8a6", "#e11d48", "#64748b", "#8b5cf6", "#10b981"
  ];
  return palette[idx % palette.length];
}

interface RevenueChartProps {
  transactions: Transaction[];
}

function parseMonthYear(date: Date) {
  return `${date.toLocaleString('default', { month: 'long' })} - ${date.getFullYear()}`;
}

function getMonthYearKey(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
}

// Custom tooltip (igual despesas)
function CustomPieTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const color = payload[0].payload.fill;
    return (
      <div
        style={{
          background: "#fff",
          border: `1px solid ${color}`,
          borderRadius: "6px",
          padding: "8px 12px",
          color: "#222",
          fontSize: 14,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          pointerEvents: "auto",
        }}
      >
        <span style={{ fontWeight: 600, color }}>{payload[0].payload.category}</span>
        <br />
        <span>
          {payload[0].payload.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </span>
      </div>
    );
  }
  return null;
}

export function RevenueChart({ transactions }: RevenueChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Agrupa receitas por mês
  const revenuesByMonth = useMemo(() => {
    const map: Record<string, Transaction[]> = {};
    transactions.forEach((t) => {
      const amount = parseFloat(t.amount);
      if (isNaN(amount) || amount <= 0) return;
      const dateObj = new Date(t.timestamp);
      const key = getMonthYearKey(dateObj);
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    return map;
  }, [transactions]);

  const now = new Date();
  const currentMonthKey = getMonthYearKey(now);
  const monthsWithReceitas = Object.keys(revenuesByMonth).sort().reverse();

  let displayMonthKey = currentMonthKey;
  if (!revenuesByMonth[displayMonthKey]) {
    displayMonthKey = monthsWithReceitas.length > 0 ? monthsWithReceitas[0] : "";
  }

  const displayMonthDate = displayMonthKey
    ? new Date(`${displayMonthKey}-01T00:00:00Z`)
    : undefined;

  // Dados para o gráfico
  const chartData = useMemo(() => {
    if (!displayMonthKey || !revenuesByMonth[displayMonthKey]) return [];
    const revenueByCategory: Record<string, { category: string; amount: number; fill: string }> = {};
    const uniqueCategories: string[] = [];
    revenuesByMonth[displayMonthKey].forEach((transaction) => {
      const category = transaction.category || "Outros";
      const amount = parseFloat(transaction.amount);
      if (!revenueByCategory[category]) {
        uniqueCategories.push(category);
        const fill =
          BASE_CATEGORY_COLORS[category] ??
          generateColor(uniqueCategories.length - 1);
        revenueByCategory[category] = {
          category,
          amount: 0,
          fill,
        };
      }
      revenueByCategory[category].amount += amount;
    });
    return Object.values(revenueByCategory);
  }, [revenuesByMonth, displayMonthKey]);

  const totalAmount = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [chartData]);

  const activeCategoryData = chartData[activeIndex] || { category: "N/A", amount: 0, fill: "#ccc" };

  if (!displayMonthKey || chartData.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-4 mb-4">
        <CardHeader>
          <CardTitle>Receitas por Categoria</CardTitle>
          <CardDescription>Nenhuma receita registrada no período.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Adicione suas receitas para ver o gráfico.</p>
        </CardContent>
      </Card>
    );
  }

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Card className="flex flex-col p-4 mb-4 w-full max-w-2xl mx-auto items-center">
      <CardHeader className="items-center pb-0">
        <CardTitle style={{ color: "#0B1F75", textAlign: "center" }}>Receitas por Categoria</CardTitle>
        <CardDescription className="text-center">
          {displayMonthDate ? parseMonthYear(displayMonthDate) : ""}
          {displayMonthKey !== currentMonthKey && (
            <span className="text-xs text-muted-foreground block">
              Mostrando o mês mais recente com receita
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 pt-2 w-full">
        <div className="w-full flex justify-center items-center" style={{ minHeight: 240 }}>
          <ResponsiveContainer width={240} height={240}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                activeIndex={activeIndex}
                onMouseEnter={handlePieEnter}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${entry.category}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                content={CustomPieTooltip}
                wrapperStyle={{
                  pointerEvents: "auto",
                  zIndex: 1000,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2">
          <p className="text-lg font-bold" style={{ color: activeCategoryData.fill }}>
            {activeCategoryData.category}
          </p>
          <p className="text-muted-foreground">
            {activeCategoryData.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <span className="block mt-1 font-semibold">
            Total: {totalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
        </div>
        {/* LEGENDAS ABAIXO DO GRÁFICO, SEM DUPLICIDADE */}
        <div className="flex flex-wrap gap-4 mt-2 justify-center w-full">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2 min-w-[100px] text-sm">
              <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <span style={{ color: "#0B1F75" }}>{item.category}</span>
              <span className="font-semibold" style={{ color: "#0B1F75" }}>
                {item.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}