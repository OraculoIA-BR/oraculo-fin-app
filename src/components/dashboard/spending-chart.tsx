import React, { useMemo, useState } from "react";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Transaction } from "@/services/transactionService";

// Paleta fixa para categorias principais
const BASE_CATEGORY_COLORS: Record<string, string> = {
  "Alimentação": "#2563eb",
  "Transporte": "#fbbf24",
  "Lazer": "#10b981",
  "Moradia": "#f472b6",
  "Compras": "#f59e42",
  "Saúde": "#8b5cf6",
  "Educação": "#3b82f6",
  "Outros": "#9ca3af",
  "Padaria": "#2dd4bf",
  "Academia": "#a21caf",
  "Farmácia": "#6366f1",
  "Aluguel": "#f87171",
  "Restaurante": "#fb7185",
  "Café": "#facc15",
};

// Gera cor para categoria extra
function generateColor(idx: number): string {
  // Paleta alternativa (cores nunca cinza)
  const palette = [
    "#22d3ee", "#a3e635", "#f43f5e", "#fbbf24", "#c026d3",
    "#0ea5e9", "#eab308", "#84cc16", "#ef4444", "#ea580c",
    "#14b8a6", "#e11d48", "#64748b", "#8b5cf6", "#10b981"
  ];
  return palette[idx % palette.length];
}

interface SpendingChartProps {
  transactions: Transaction[];
}

function parseMonthYear(date: Date) {
  return `${date.toLocaleString('default', { month: 'long' })} - ${date.getFullYear()}`;
}

function getMonthYearKey(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
}

// Custom tooltip para recharts, posicionado ao lado do mouse
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

export function SpendingChart({ transactions }: SpendingChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const expensesByMonth = useMemo(() => {
    const map: Record<string, Transaction[]> = {};
    transactions.forEach((t) => {
      const amount = parseFloat(t.amount);
      if (isNaN(amount) || amount >= 0) return;
      const dateObj = new Date(t.timestamp);
      const key = getMonthYearKey(dateObj);
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    return map;
  }, [transactions]);

  const now = new Date();
  const currentMonthKey = getMonthYearKey(now);
  const monthsWithDespesa = Object.keys(expensesByMonth).sort().reverse();

  let displayMonthKey = currentMonthKey;
  if (!expensesByMonth[displayMonthKey]) {
    displayMonthKey = monthsWithDespesa.length > 0 ? monthsWithDespesa[0] : "";
  }

  const displayMonthDate = displayMonthKey
    ? new Date(`${displayMonthKey}-01T00:00:00Z`)
    : undefined;

  const chartData = useMemo(() => {
    if (!displayMonthKey || !expensesByMonth[displayMonthKey]) return [];
    const spendingByCategory: Record<string, { category: string; amount: number; fill: string }> = {};
    const uniqueCategories: string[] = [];
    expensesByMonth[displayMonthKey].forEach((transaction) => {
      const category = transaction.category || "Outros";
      const amount = Math.abs(parseFloat(transaction.amount));
      if (!spendingByCategory[category]) {
        uniqueCategories.push(category);
        const fill =
          BASE_CATEGORY_COLORS[category] ??
          generateColor(uniqueCategories.length - 1);
        spendingByCategory[category] = {
          category,
          amount: 0,
          fill,
        };
      }
      spendingByCategory[category].amount += amount;
    });
    return Object.values(spendingByCategory);
  }, [expensesByMonth, displayMonthKey]);

  const totalAmount = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [chartData]);

  const activeCategoryData = chartData[activeIndex] || { category: "N/A", amount: 0, fill: "#ccc" };

  if (!displayMonthKey || chartData.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-4 mb-4">
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
          <CardDescription>Nenhuma despesa registrada no período.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Adicione suas despesas para ver o gráfico.</p>
        </CardContent>
      </Card>
    );
  }

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Card className="flex flex-col p-4 mb-4 w-full max-w-2xl mx-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gastos por Categoria</CardTitle>
        <CardDescription>
          {displayMonthDate ? parseMonthYear(displayMonthDate) : ""}
          {displayMonthKey !== currentMonthKey && (
            <span className="text-xs text-muted-foreground block">
              Mostrando o mês mais recente com despesa
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 pt-2">
        <div className="w-full flex justify-center items-center" style={{ minHeight: 220 }}>
          <ResponsiveContainer width={220} height={220}>
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
                // position={undefined} // Não força posição, deixa o padrão do recharts (ao lado do mouse)
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
        <div className="flex flex-wrap gap-4 mt-2 justify-center w-full">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2 min-w-[100px] text-sm">
              <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <span>{item.category}</span>
              <span className="font-semibold">
                {item.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}