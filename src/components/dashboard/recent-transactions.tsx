import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Car, Film, Home, ShoppingCart, Utensils, Zap, DollarSign } from 'lucide-react';
import { cn } from "@/lib/utils";

const transactions = [
  { category: 'Salário', item: 'Pagamento Empresa Y', amount: 5000.00, date: '25/07', icon: <DollarSign className="h-4 w-4" /> },
  { category: 'Alimentação', item: 'Supermercado Pão de Mel', amount: -250.75, date: '25/07', icon: <ShoppingCart className="h-4 w-4" /> },
  { category: 'Transporte', item: 'Uber', amount: -35.50, date: '24/07', icon: <Car className="h-4 w-4" /> },
  { category: 'Lazer', item: 'Cinema Shopping X', amount: -50.00, date: '23/07', icon: <Film className="h-4 w-4" /> },
  { category: 'Contas', item: 'Conta de Luz', amount: -150.00, date: '22/07', icon: <Zap className="h-4 w-4" /> },
  { category: 'Restaurante', item: 'Almoço com amigos', amount: -85.90, date: '22/07', icon: <Utensils className="h-4 w-4" /> },
  { category: 'Moradia', item: 'Aluguel', amount: -1200.00, date: '20/07', icon: <Home className="h-4 w-4" /> },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas Transações</CardTitle>
        <CardDescription>
          Aqui estão as suas transações mais recentes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="hidden sm:table-cell">Categoria</TableHead>
              <TableHead className="hidden sm:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-muted rounded-full">{transaction.icon}</span>
                    <div className="font-medium">{transaction.item}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{transaction.category}</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{transaction.date}</TableCell>
                <TableCell className={cn("text-right font-semibold", transaction.amount > 0 ? "text-success" : "text-destructive")}>
                  {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
