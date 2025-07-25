// src/components/dashboard/category-charts.tsx
"use client";
import React from 'react';
import { Car, Utensils, Shirt } from 'lucide-react';
import { CategoryChart } from './category-chart';

// Dados de exemplo (mock) para os gráficos.
// No futuro, estes dados virão da sua API ou do estado da aplicação.
const mockData = {
  transport: [
    { name: 'Jan', value: 300 }, { name: 'Fev', value: 350 }, { name: 'Mar', value: 400 }, { name: 'Abr', value: 320 },
  ],
  food: [
    { name: 'Jan', value: 800 }, { name: 'Fev', value: 750 }, { name: 'Mar', value: 900 }, { name: 'Abr', value: 850 },
  ],
  clothing: [
    { name: 'Jan', value: 150 }, { name: 'Fev', value: 200 }, { name: 'Mar', value: 100 }, { name: 'Abr', value: 250 },
  ],
};

/**
 * Exibe uma seção com gráficos de análise por categoria.
 * Utiliza o componente reutilizável `CategoryChart` para cada categoria.
 */
export function CategoryCharts() {
  return (
    <>
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Análise por Categoria</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryChart title="Transporte" data={mockData.transport} icon={Car} />
        <CategoryChart title="Alimentação" data={mockData.food} icon={Utensils} />
        <CategoryChart title="Vestuário" data={mockData.clothing} icon={Shirt} />
      </div>
    </>
  );
}
