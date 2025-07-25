// src/components/dashboard/spending-chart.tsx
"use client";

import * as React from "react";
import { Pie, PieChart, Sector } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

// Dados de exemplo para o gráfico.
const chartData = [
  { category: "Alimentação", amount: 1240.50, fill: "var(--color-food)" },
  { category: "Transporte", amount: 350.80, fill: "var(--color-transport)" },
  { category: "Lazer", amount: 480.00, fill: "var(--color-leisure)" },
  { category: "Contas", amount: 850.25, fill: "var(--color-bills)" },
  { category: "Compras", amount: 620.00, fill: "var(--color-shopping)" },
];

// Configuração das categorias do gráfico.
const chartConfig = {
  amount: { label: "Valor (R$)" },
  food: { label: "Alimentação", color: "hsl(var(--chart-1))" },
  transport: { label: "Transporte", color: "hsl(var(--chart-2))" },
  leisure: { label: "Lazer", color: "hsl(var(--chart-3))" },
  bills: { label: "Contas", color: "hsl(var(--chart-4))" },
  shopping: { label: "Compras", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export function SpendingChart() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);
  
  const activeCategory = chartData[activeIndex].category as keyof typeof chartConfig;

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
            <p className="text-lg font-bold" style={{ color: chartConfig[activeCategory]?.color }}>
            {chartConfig[activeCategory]?.label}
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
      </CardContent>
    </Card>
  );
}
