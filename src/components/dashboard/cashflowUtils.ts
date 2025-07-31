import { Transaction } from "@/services/transactionService";

export function getMonthLabels(transactions: Transaction[]) {
  const months = Array.from(
    new Set(
      transactions.map((t) => {
        const date = new Date(t.timestamp);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      })
    )
  ).sort((a, b) => (a < b ? 1 : -1));
  return months.map((key) => {
    const date = new Date(`${key}-01T00:00:00`);
    return {
      key,
      label: date.toLocaleString("default", { month: "short" }) + "/" + date.getFullYear(),
    };
  });
}

export function groupTransactionsByMonth(transactions: Transaction[]) {
  const groups: Record<string, Transaction[]> = {};
  transactions.forEach((t) => {
    const date = new Date(t.timestamp);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  return groups;
}

// Retorna os saldos finais por mês, RECEBENDO array de transactions
export function getSaldosFinaisPorMes(transactions: Transaction[]) {
  const monthLabels = getMonthLabels(transactions);
  const transactionsByMonth = groupTransactionsByMonth(transactions);

  // Calcula saldo anterior por mês
  const monthsAsc = [...monthLabels].sort((a, b) => (a.key > b.key ? 1 : -1));
  const prevMonthBalances: Record<string, number> = {};
  let prevBalance = 0;
  monthsAsc.forEach((month) => {
    const monthTxs = transactionsByMonth[month.key] || [];
    prevMonthBalances[month.key] = prevBalance;
    const receb = monthTxs.filter((t) => Number(t.amount) > 0).reduce((acc, t) => acc + Number(t.amount), 0);
    const pag = monthTxs.filter((t) => Number(t.amount) < 0).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    prevBalance = prevBalance + receb - pag;
  });

  // Saldos finais: saldo anterior + geração caixa no mês
  return monthLabels.map((month) => {
    const txs = transactionsByMonth[month.key] || [];
    const saldoAnterior = prevMonthBalances[month.key] || 0;
    const receb = txs.filter((t) => Number(t.amount) > 0).reduce((acc, t) => acc + Number(t.amount), 0);
    const pag = txs.filter((t) => Number(t.amount) < 0).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    const saldoFinal = saldoAnterior + (receb - pag);
    return {
      key: month.key,
      label: month.label,
      saldoFinal,
      recebimentos: receb,
      pagamentos: pag,
    };
  });
}