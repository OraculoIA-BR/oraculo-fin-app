// src/components/dashboard/recent-transactions.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TransactionItem } from "./transaction-item";
import { type Transaction } from "@/lib/firebase"; // Importa a interface
import { List } from "lucide-react";

// Define as props que o componente espera receber.
interface RecentTransactionsProps {
  transactions: Transaction[];
}

/**
 * Exibe uma lista das transações mais recentes.
 */
export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <List className="h-6 w-6" />
          <span>Transações Recentes</span>
        </CardTitle>
        <CardDescription>
          Suas últimas 10 movimentações financeiras.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Verifica se há transações para exibir */}
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            // Exibe um estado vazio se não houver transações.
            <div className="text-center text-gray-500 py-8">
              <p>Nenhuma transação encontrada.</p>
              <p className="text-sm">Comece a adicionar suas receitas e despesas!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
