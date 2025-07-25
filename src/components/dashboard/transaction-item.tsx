// src/components/dashboard/transaction-item.tsx
import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";

type Transaction = {
    category: string;
    item: string;
    amount: number;
    date: string;
    icon: React.ReactNode;
};

export const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <span className="p-2 bg-gray-100 rounded-full">{transaction.icon}</span>
                    <div className="font-medium">{transaction.item}</div>
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <Badge variant="outline">{transaction.category}</Badge>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{transaction.date}</TableCell>
            <TableCell className={cn("text-right font-semibold", transaction.amount > 0 ? "text-green-600" : "text-red-600")}>
                {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </TableCell>
        </TableRow>
    );
};
