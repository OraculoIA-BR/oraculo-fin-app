// src/components/dashboard/spending-chart.tsx
"use client";

import * as React from "react";
import { Pie, PieChart, Sector } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

// Defina cores fixas para garantir correspondência
const chartData = [
  { category: "Alimentação", amount: 1240.50, fill: "#2563eb" },   // azul
  { category: "Transporte", amount: 350.80, fill: "#fbbf24" },     // amarelo
  { category: "Lazer", amount: 480.00, fill: "#10b981" },          // verde
  { category: "Contas", amount: 850.25, fill: "#f472b6" },         // rosa
  { category: "Compras", amount: 620.00, fill: "#f59e42" }         // laranja
];

const chartConfig = {
  amount: { label: "Valor (R$)" },
  food: { label: "Alimentação", color: "#2563eb" },
  transport: { label: "Transporte", color: "#fbbf24" },
  leisure: { label: "Lazer", color: "#10b981" },
  bills: { label: "Contas", color: "#f472b6" },
  shopping: { label: "Compras", color: "#f59e42" },
};

export function SpendingChart() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);
  
  const activeCategory = chartData[activeIndex].category;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gastos por Categoria</CardTitle>
        <CardDescription>Janeiro - 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                hideLabel 
                formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
              />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius} stroke={props.fill} />
                </g>
              )}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardContent className="flex-1 p-6 text-sm flex flex-col items-center justify-end">
        <div className="text-center">
          <p className="text-lg font-bold" style={{ color: chartData[activeIndex].fill }}>
            {chartData[activeIndex].category}
          </p>
          <p className="text-muted-foreground">
            {chartData[activeIndex].amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
        <div className="w-full mt-4">
          <div className="flex justify-between items-center font-medium border-t pt-2">
            <span>Total:</span>
            <span>{totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </div>
        {/* LEGENDA DAS CATEGORIAS: cor, nome e valor */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2 min-w-[120px]">
              <span
                className="inline-block w-4 h-4 rounded-full border"
                style={{ background: item.fill, borderColor: item.fill }}
                aria-label={item.category}
              />
              <span className="text-xs font-medium">{item.category}</span>
              <span className="text-xs text-muted-foreground">
                {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}