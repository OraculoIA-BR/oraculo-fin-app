// src/components/dashboard/category-chart.tsx
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryChartProps {
    title: string;
    data: { name: string; value: number }[];
    icon: React.ElementType;
  }
  
export const CategoryChart: React.FC<CategoryChartProps> = ({ title, data, icon: Icon }) => (
<Card>
    <CardHeader>
    <CardTitle className="flex items-center gap-2 text-blue-900">
        <Icon className="h-5 w-5" />
        {title}
    </CardTitle>
    </CardHeader>
    <CardContent>
    <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} />
        <YAxis fontSize={12} tickFormatter={(value) => `R$${value}`} />
        <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
            cursor={{ fill: 'rgba(11, 31, 117, 0.1)' }}
        />
        <Bar dataKey="value" fill="#0B1F75" name="Valor" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
    </CardContent>
</Card>
);