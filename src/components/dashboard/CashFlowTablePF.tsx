"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Transaction } from "@/services/transactionService";
import {
  getMonthLabels,
  groupTransactionsByMonth,
  getSaldosFinaisPorMes,
} from "./cashflowUtils";

// Bordas: 2px vira 1px, 1px vira 0.5px
const mainBorder = "0.5px solid #0B1F75";
const thickBorder = "1px solid #0B1F75";

// Helper para formatar valores (sem "R$")
function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const CATEGORY_BG = "#e3e9f8";
const HIGHLIGHT_BG = "#f3f6fb";

// Estrutura das linhas e categorias
const ROWS_STRUCTURE = [
  {
    id: "saldo_anterior",
    label: "Saldo do Mês Anterior",
    type: "main",
  },
  {
    id: "recebimentos",
    label: "Total de Recebimentos",
    type: "main",
    highlight: true,
    children: [
      { id: "salario", label: "Receitas de Salário" },
      { id: "freela", label: "Receitas de Freelancer/Serviços" },
      { id: "investimentos", label: "Rendimentos de Investimentos" },
      { id: "outros_receb", label: "Outros Recebimentos" },
    ],
  },
  {
    id: "pagamentos",
    label: "Total de Pagamentos",
    type: "main",
    highlight: true,
    children: [
      { id: "moradia", label: "Despesas com Moradia" },
      { id: "alimentacao", label: "Alimentação" },
      { id: "transporte", label: "Transporte" },
      { id: "saude", label: "Saúde" },
      { id: "educacao", label: "Educação" },
      { id: "lazer", label: "Lazer" },
      { id: "adm", label: "Despesas Administrativas" },
      { id: "impostos", label: "Impostos e Taxas" },
      { id: "bens_imobilizados", label: "Bens Imobilizados" },
      { id: "emprestimos", label: "Empréstimos e Financiamentos" },
      { id: "outros_pagamentos", label: "Outros Pagamentos/Eventuais" },
    ],
  },
  {
    id: "geracao_caixa",
    label: "Geração de Caixa no Mês",
    type: "main",
  },
  {
    id: "transferencias",
    label: "Total de Transferências",
    type: "main",
    children: [
      { id: "entre_contas", label: "Transferências entre contas próprias" },
      { id: "dinheiro", label: "Depósitos/saques em dinheiro" },
    ],
  },
  {
    id: "saldo_final",
    label: "Saldo Final do Mês",
    type: "main",
    highlight: true,
  },
];

// Função para calcular valores para cada célula
function calculateRowValue(
  rowId: string,
  transactions: Transaction[],
  prevMonthBalance: number = 0
) {
  switch (rowId) {
    case "saldo_anterior":
      return prevMonthBalance;
    case "recebimentos":
      return transactions
        .filter((t) => Number(t.amount) > 0)
        .reduce((acc, t) => acc + Number(t.amount), 0);
    case "salario":
      return transactions
        .filter(
          (t) => Number(t.amount) > 0 && t.category === "Salário"
        )
        .reduce((acc, t) => acc + Number(t.amount), 0);
    case "freela":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) > 0 &&
            ["Freela", "Freelance", "Serviços"].includes(t.category)
        )
        .reduce((acc, t) => acc + Number(t.amount), 0);
    case "investimentos":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) > 0 &&
            ["Investimento", "Rendimento"].includes(t.category)
        )
        .reduce((acc, t) => acc + Number(t.amount), 0);
    case "outros_receb":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) > 0 &&
            ![
              "Salário",
              "Freela",
              "Freelance",
              "Serviços",
              "Investimento",
              "Rendimento",
            ].includes(t.category)
        )
        .reduce((acc, t) => acc + Number(t.amount), 0);

    case "pagamentos":
      return transactions
        .filter((t) => Number(t.amount) < 0)
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "moradia":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            [
              "Moradia",
              "Aluguel",
              "Condomínio",
              "Energia",
              "Água",
            ].includes(t.category)
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "alimentacao":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            [
              "Alimentação",
              "Supermercado",
              "Restaurante",
              "Delivery",
            ].includes(t.category)
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "transporte":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            [
              "Transporte",
              "Combustível",
              "Transporte Público",
              "Manutenção",
            ].includes(t.category)
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "saude":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            ["Saúde", "Plano", "Consulta", "Farmácia"].includes(
              t.category
            )
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "educacao":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            ["Educação", "Escola", "Curso", "Livro"].includes(
              t.category
            )
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "lazer":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            ["Lazer", "Viagem", "Passeio", "Cinema", "Hobby"].includes(
              t.category
            )
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "adm":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            ["Administrativo", "Banco", "Tarifa", "Seguro"].includes(
              t.category
            )
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "impostos":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            [
              "Imposto",
              "Taxa",
              "IPTU",
              "IPVA",
              "IR",
              "ISS",
            ].includes(t.category)
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "bens_imobilizados":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            [
              "Bem Imobilizado",
              "Imobilizado",
              "Equipamento",
              "Veículo",
            ].includes(t.category)
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "emprestimos":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            ["Empréstimo", "Financiamento", "Crédito"].includes(
              t.category
            )
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "outros_pagamentos":
      return transactions
        .filter(
          (t) =>
            Number(t.amount) < 0 &&
            ![
              "Moradia",
              "Alimentação",
              "Transporte",
              "Saúde",
              "Educação",
              "Lazer",
              "Administrativo",
              "Banco",
              "Tarifa",
              "Seguro",
              "Imposto",
              "Taxa",
              "IPTU",
              "IPVA",
              "IR",
              "ISS",
              "Bem Imobilizado",
              "Imobilizado",
              "Equipamento",
              "Veículo",
              "Empréstimo",
              "Financiamento",
              "Crédito",
            ].includes(t.category)
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);

    case "geracao_caixa":
      const receb = transactions
        .filter((t) => Number(t.amount) > 0)
        .reduce((acc, t) => acc + Number(t.amount), 0);
      const pag = transactions
        .filter((t) => Number(t.amount) < 0)
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
      return receb - pag;

    case "transferencias":
      return transactions
        .filter((t) =>
          ["Transferência", "Depósito", "Saque"].includes(t.category)
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "entre_contas":
      return transactions
        .filter((t) => t.category === "Transferência")
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "dinheiro":
      return transactions
        .filter((t) =>
          ["Depósito", "Saque"].includes(t.category)
        )
        .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);

    case "saldo_final":
      const saldoFinal = prevMonthBalance + transactions
        .filter((t) => Number(t.amount) > 0)
        .reduce((acc, t) => acc + Number(t.amount), 0) -
        transactions
          .filter((t) => Number(t.amount) < 0)
          .reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
      return saldoFinal;
    default:
      return 0;
  }
}

export default function CashFlowTablePF({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragData = React.useRef<{
    isDragging: boolean;
    startX: number;
    scrollLeft: number;
  }>({ isDragging: false, startX: 0, scrollLeft: 0 });

  const monthLabels = React.useMemo(
    () => getMonthLabels(transactions),
    [transactions]
  );
  const transactionsByMonth = React.useMemo(
    () => groupTransactionsByMonth(transactions),
    [transactions]
  );
  const saldosFinaisPorMes = React.useMemo(
    () => getSaldosFinaisPorMes(transactions),
    [transactions]
  );
  // Calcula saldo anterior para cada mês (usando os saldos finais já calculados)
  const prevMonthBalances = React.useMemo(() => {
    const result: Record<string, number> = {};
    saldosFinaisPorMes.forEach((m, idx) => {
      result[m.key] = idx > 0 ? saldosFinaisPorMes[idx - 1].saldoFinal : 0;
    });
    return result;
  }, [saldosFinaisPorMes]);

  const handleExpandToggle = (rowId: string) => {
    setExpanded((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      dragData.current.isDragging = true;
      dragData.current.startX = e.pageX - container.offsetLeft;
      dragData.current.scrollLeft = container.scrollLeft;
      container.classList.add("scrolling-active");
      container.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragData.current.isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = x - dragData.current.startX;
      container.scrollLeft = dragData.current.scrollLeft - walk;
    };
    const onMouseUp = () => {
      dragData.current.isDragging = false;
      container.classList.remove("scrolling-active");
      container.style.cursor = "grab";
    };
    const onMouseLeave = () => {
      dragData.current.isDragging = false;
      container.classList.remove("scrolling-active");
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseleave", onMouseLeave);

    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].pageX - container.offsetLeft;
      touchScrollLeft = container.scrollLeft;
      container.classList.add("scrolling-active");
    };
    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = x - touchStartX;
      container.scrollLeft = touchScrollLeft - walk;
    };
    const onTouchEnd = () => container.classList.remove("scrolling-active");
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const renderMainAndChildrenRows = (row: any) => {
    const isExpanded = expanded.includes(row.id);
    const hasChildren = !!row.children;
    const highlight = !!row.highlight;

    const mainRow = (
      <TableRow
        sx={{
          bgcolor: highlight ? HIGHLIGHT_BG : "#fff",
          "& td": {
            fontWeight: 600,
            color: "#0B1F75",
            fontSize: "1rem",
            cursor: "move",
            userSelect: "none",
            borderBottom: mainBorder,
            borderRadius: 0,
          },
        }}
        onClick={hasChildren ? () => handleExpandToggle(row.id) : undefined}
        hover={!!hasChildren}
        key={row.id}
      >
        <TableCell
          sx={{
            position: "sticky",
            left: 0,
            zIndex: 3,
            background: CATEGORY_BG,
            minWidth: 260,
            borderRight: thickBorder,
            boxShadow: "2px 0 0 #fff",
            color: "#0B1F75",
            borderBottom: mainBorder,
            whiteSpace: "nowrap",
            py: 1.5,
            cursor: "move",
            userSelect: "none",
            borderRadius: 0,
          }}
        >
          {hasChildren && (
            <IconButton
              aria-label="expand row"
              size="small"
              sx={{
                position: "absolute",
                left: 6,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 4,
                background: CATEGORY_BG,
                color: "#0B1F75",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleExpandToggle(row.id);
              }}
              tabIndex={-1}
            >
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
          <span style={{ marginLeft: hasChildren ? 38 : 0 }}>{row.label}</span>
        </TableCell>
        {monthLabels.map((month, idx) => (
          <TableCell
            key={month.key}
            align="left"
            sx={{
              fontWeight: 600,
              position: "relative",
              borderRight: idx < monthLabels.length - 1 ? mainBorder : "none",
              background: highlight ? HIGHLIGHT_BG : "#fff",
              minWidth: 150,
              whiteSpace: "nowrap",
              py: 1.5,
              color: "#0B1F75",
              borderBottom: mainBorder,
              cursor: "move",
              userSelect: "none",
              borderRadius: 0,
            }}
          >
            {row.id === "saldo_anterior"
              ? formatCurrency(prevMonthBalances[month.key] || 0)
              : row.id === "saldo_final"
              ? formatCurrency(
                  saldosFinaisPorMes.find((m) => m.key === month.key)?.saldoFinal || 0
                )
              : formatCurrency(
                  calculateRowValue(
                    row.id,
                    transactionsByMonth[month.key] || [],
                    prevMonthBalances[month.key] || 0
                  )
                )}
          </TableCell>
        ))}
      </TableRow>
    );

    const childrenRows =
      hasChildren && isExpanded
        ? row.children.map((child: any) => (
            <TableRow
              key={child.id}
              sx={{
                bgcolor: "#fff",
                "& td": {
                  borderBottom: mainBorder,
                  cursor: "move",
                  userSelect: "none",
                  borderRadius: 0,
                },
              }}
            >
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                  background: "#fff",
                  minWidth: 260,
                  borderRight: thickBorder,
                  boxShadow: "2px 0 0 #fff",
                  pl: 2,
                  py: 0.5,
                  color: "#0B1F75",
                  fontSize: "1rem",
                  fontWeight: 400,
                  borderBottom: mainBorder,
                  whiteSpace: "nowrap",
                  cursor: "move",
                  userSelect: "none",
                  borderRadius: 0,
                }}
              >
                {child.label}
              </TableCell>
              {monthLabels.map((month, colIdx) => (
                <TableCell
                  key={month.key}
                  align="left"
                  sx={{
                    borderRight: colIdx < monthLabels.length - 1 ? mainBorder : "none",
                    background: "#fff",
                    minWidth: 150,
                    whiteSpace: "nowrap",
                    py: 0.5,
                    color: "#0B1F75",
                    fontSize: "1rem",
                    fontWeight: 400,
                    borderBottom: mainBorder,
                    cursor: "move",
                    userSelect: "none",
                    borderRadius: 0,
                  }}
                >
                  {formatCurrency(
                    calculateRowValue(child.id, transactionsByMonth[month.key] || [])
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        : null;

    return (
      <React.Fragment key={row.id}>
        {mainRow}
        {childrenRows}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#fff", boxShadow: 2, my: 3, p: 2, borderRadius: 0 }}>
      <Typography variant="h5" color="primary" fontWeight={700} mb={2}>
        Fluxo de Caixa Pessoal (PF)
      </Typography>
      <TableContainer
        component={Paper}
        ref={containerRef}
        sx={{
          overflowX: "auto",
          overflowY: "visible",
          maxHeight: "none",
          boxShadow: "none",
          width: "100%",
          border: thickBorder,
          borderRadius: 0,
          cursor: "grab",
          "&::-webkit-scrollbar": {
            height: "0px",
            transition: "height 0.2s",
          },
          "&.scrolling-active::-webkit-scrollbar": {
            height: "5px",
            background: "#fff",
          },
          "&:hover::-webkit-scrollbar": {
            height: "5px",
            background: "#fff",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#0B1F75",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#fff",
          },
          scrollbarColor: "#0B1F75 #fff",
          scrollbarWidth: "none",
          "&.scrolling-active": {
            scrollbarWidth: "thin",
          },
          "&:hover": {
            scrollbarWidth: "thin",
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  zIndex: 3,
                  minWidth: 260,
                  background: CATEGORY_BG,
                  color: "#0B1F75",
                  fontWeight: 700,
                  borderRight: thickBorder,
                  boxShadow: "2px 0 0 #fff",
                  borderBottom: mainBorder,
                  whiteSpace: "nowrap",
                  py: 1.5,
                  cursor: "move",
                  userSelect: "none",
                  borderRadius: 0,
                }}
              >
                Categorias de Lançamentos
              </TableCell>
              {monthLabels.map((month, idx) => (
                <TableCell
                  key={month.key}
                  align="left"
                  sx={{
                    background: CATEGORY_BG,
                    color: "#0B1F75",
                    fontWeight: 700,
                    fontSize: "1rem",
                    borderRight: idx < monthLabels.length - 1 ? mainBorder : "none",
                    minWidth: 150,
                    whiteSpace: "nowrap",
                    borderBottom: mainBorder,
                    py: 1.5,
                    cursor: "move",
                    userSelect: "none",
                    borderRadius: 0,
                  }}
                >
                  {month.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ROWS_STRUCTURE.map((row) => renderMainAndChildrenRows(row))}
          </TableBody>
        </Table>
      </TableContainer>
      <style jsx global>{`
        .MuiPaper-root::-webkit-scrollbar {
          height: 0px !important;
        }
        .MuiPaper-root.scrolling-active::-webkit-scrollbar,
        .MuiPaper-root:hover::-webkit-scrollbar {
          height: 5px !important;
        }
      `}</style>
    </Box>
  );
}