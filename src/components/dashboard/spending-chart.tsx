"use client"

import * as React from "react"
import { Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { category: "Alimentação", amount: 1240.50, fill: "var(--color-food)" },
  { category: "Transporte", amount: 350.80, fill: "var(--color-transport)" },
  { category: "Lazer", amount: 480.00, fill: "var(--color-leisure)" },
  { category: "Contas", amount: 850.25, fill: "var(--color-bills)" },
  { category: "Compras", amount: 620.00, fill: "var(--color-shopping)" },
]

const chartConfig = {
  amount: {
    label: "Valor (R$)",
  },
  food: {
    label: "Alimentação",
    color: "hsl(var(--chart-1))",
  },
  transport: {
    label: "Transporte",
    color: "hsl(var(--chart-2))",
  },
  leisure: {
    label: "Lazer",
    color: "hsl(var(--chart-3))",
  },
  bills: {
    label: "Contas",
    color: "hsl(var(--chart-4))",
  },
  shopping: {
    label: "Compras",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function SpendingChart() {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gastos por Categoria</CardTitle>
        <CardDescription>Janeiro - 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius} stroke={props.fill} />
                </g>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardContent className="flex-1 p-6 text-sm flex justify-center items-end">
         <div className="font-medium">
            Total: {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
      </CardContent>
    </Card>
  )
}
