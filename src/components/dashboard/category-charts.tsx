"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Car, Utensils, Shirt } from 'lucide-react';

// Dados de exemplo
const transportData = [
  { name: 'Jan', value: 300 },
  { name: 'Fev', value: 350 },
  { name: 'Mar', value: 400 },
  { name: 'Abr', value: 320 },
];

const foodData = [
  { name: 'Jan', value: 800 },
  { name: 'Fev', value: 750 },
  { name: 'Mar', value: 900 },
  { name: 'Abr', value: 850 },
];

const clothingData = [
  { name: 'Jan', value: 150 },
  { name: 'Fev', value: 200 },
  { name: 'Mar', value: 100 },
  { name: 'Abr', value: 250 },
];

const COLORS = ['#2B3FAE', '#F13E8E', '#8884d8', '#82ca9d'];

const CategoryChart = ({ title, data, icon: Icon }: { title: string, data: any[], icon: React.ElementType }) => (
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2B3FAE" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export function CategoryCharts() {
  return (
    <>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Análise por Categoria</h2>
        <div className="grid md:grid-cols-3 gap-6">
            <CategoryChart title="Transporte" data={transportData} icon={Car} />
            <CategoryChart title="Alimentação" data={foodData} icon={Utensils} />
            <CategoryChart title="Vestuário" data={clothingData} icon={Shirt} />
        </div>
    </>
  );
}
