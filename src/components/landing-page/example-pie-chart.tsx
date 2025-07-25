// src/components/landing-page/example-pie-chart.tsx
"use client";

// --- Componente de Gráfico de Pizza com Legenda ---
export const ExamplePieChart = () => {
    // Dados com proporções realistas
    const categories = [
        { name: "Moradia", value: 30, color: "bg-blue-800" },
        { name: "Alimentação", value: 16, color: "bg-blue-600" },
        { name: "Transporte", value: 8, color: "bg-blue-400" },
        { name: "Contas", value: 7, color: "bg-blue-300" },
        { name: "Dívidas", value: 5, color: "bg-blue-200" },
        { name: "Investimentos", value: 5, color: "bg-pink-500" },
        { name: "Saúde", value: 5, color: "bg-pink-400" },
        { name: "Compras", value: 4, color: "bg-pink-300" },
        { name: "Lazer", value: 4, color: "bg-pink-200" },
        { name: "Educação", value: 3, color: "bg-sky-400" },
    ];

    // Cria o gradiente cônico para a pizza
    const conicGradient = `conic-gradient(${
        categories.map((cat, index) => {
            const startAngle = categories.slice(0, index).reduce((acc, c) => acc + (c.value * 3.6), 0);
            const endAngle = startAngle + (cat.value * 3.6);
            const colorMap: { [key: string]: string } = {
                'blue-800': '#2B3FAE', 'blue-600': '#4F46E5', 'blue-400': '#60A5FA', 'blue-300': '#93C5FD', 'blue-200': '#BFDBFE',
                'pink-500': '#EC4899', 'pink-400': '#F472B6', 'pink-300': '#F9A8D4', 'pink-200': '#FBCFE8',
                'sky-400': '#38BDF8'
            };
            return `${colorMap[cat.color.replace('bg-', '')]} ${startAngle}deg ${endAngle}deg`;
        }).join(', ')
    })`;
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-md font-bold text-blue-900 mb-4">Gastos Mensais (Exemplo)</h3>
            <div
                className="w-40 h-40 mx-auto rounded-full"
                style={{ background: conicGradient }}
            />
            <div className="mt-4 grid grid-cols-2 text-left text-xs gap-x-4 gap-y-1">
                {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                        <span className="text-gray-600">{cat.name} ({cat.value}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
