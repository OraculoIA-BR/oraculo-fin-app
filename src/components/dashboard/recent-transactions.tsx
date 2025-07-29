import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TransactionItem } from "./transaction-item";
import { type Transaction } from "@/services/transactionService";
import { List } from "lucide-react";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

/**
 * Exibe uma lista das transações mais recentes.
 */
export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  // Ordena por data decrescente antes de pegar as 10 mais recentes
  const recentTransactions = [...transactions]
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateB - dateA;
    })
    .slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5 text-blue-600" />
          Transações Recentes
        </CardTitle>
        <CardDescription>Veja suas últimas movimentações financeiras</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Verifica se há transações para exibir */}
          {recentTransactions && recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.transactionId || transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-6">
              Nenhuma transação recente encontrada.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}