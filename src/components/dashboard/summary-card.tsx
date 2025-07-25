// src/components/dashboard/summary-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    description: string;
    trend?: string;
    trendColor?: string;
  }
  
export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, description, trend, trendColor }) => {
return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
    </CardHeader>
    <CardContent>
        <div className="text-2xl font-bold">
        {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
    </Card>
);
};
