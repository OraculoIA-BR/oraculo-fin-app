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

// Helper para formatar valores
function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Helper para agrupar transações por mês
function groupTransactionsByMonth(transactions: Transaction[]) {
  const groups: Record<string, Transaction[]> = {};
  transactions.forEach((t) => {
    const date = new Date(t.timestamp);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  return groups;
}

// Meses para colunas (ordem decrescente: mais atual -> mais antigo)
function getMonthLabels(transactions: Transaction[]) {
  const months = Array.from(
    new Set(
      transactions.map((t) => {
        const date = new Date(t.timestamp);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      })
    )
  ).sort((a, b) => (a < b ? 1 : -1)); // ordem decrescente
  return months.map((key) => {
    const date = new Date(`${key}-01T00:00:00`);
    return {
      key,
      label: date.toLocaleString("default", { month: "short" }) + "/" + date.getFullYear(),
    };
  });
}

// Azul escuro para coluna de categorias e linha dos meses
const CATEGORY_BG = "#e3e9f8";
const HIGHLIGHT_BG = "#f3f6fb";

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
function calculateRowValue(rowId: string, transactions: Transaction[]) {
  switch (rowId) {
    case "saldo_anterior":
      return 0;
    case "recebimentos":
      return transactions.filter((t) => Number(t.amount) > 0).reduce((acc, t) => acc + Number(t.amount), 0);
    case "salario":
      return transactions.filter((t) => Number(t.amount) > 0 && t.category === "Salário").reduce((acc, t) => acc + Number(t.amount), 0);
    case "freela":
      return transactions.filter((t) => Number(t.amount) > 0 && ["Freela", "Freelance", "Serviços"].includes(t.category)).reduce((acc, t) => acc + Number(t.amount), 0);
    case "investimentos":
      return transactions.filter((t) => Number(t.amount) > 0 && ["Investimento", "Rendimento"].includes(t.category)).reduce((acc, t) => acc + Number(t.amount), 0);
    case "outros_receb":
      return transactions.filter((t) => Number(t.amount) > 0 && !["Salário", "Freela", "Freelance", "Serviços", "Investimento", "Rendimento"].includes(t.category)).reduce((acc, t) => acc + Number(t.amount), 0);

    case "pagamentos":
      return transactions.filter((t) => Number(t.amount) < 0).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "moradia":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Moradia", "Aluguel", "Condomínio", "Energia", "Água"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "alimentacao":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Alimentação", "Supermercado", "Restaurante", "Delivery"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "transporte":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Transporte", "Combustível", "Transporte Público", "Manutenção"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "saude":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Saúde", "Plano", "Consulta", "Farmácia"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "educacao":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Educação", "Escola", "Curso", "Livro"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "lazer":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Lazer", "Viagem", "Passeio", "Cinema", "Hobby"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "adm":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Administrativo", "Banco", "Tarifa", "Seguro"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "impostos":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Imposto", "Taxa", "IPTU", "IPVA", "IR", "ISS"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "bens_imobilizados":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Bem Imobilizado", "Imobilizado", "Equipamento", "Veículo"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "emprestimos":
      return transactions.filter((t) => Number(t.amount) < 0 && ["Empréstimo", "Financiamento", "Crédito"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "outros_pagamentos":
      return transactions.filter((t) => Number(t.amount) < 0 &&
        !["Moradia","Alimentação","Transporte","Saúde","Educação","Lazer","Administrativo","Banco","Tarifa","Seguro","Imposto","Taxa","IPTU","IPVA","IR","ISS","Bem Imobilizado","Imobilizado","Equipamento","Veículo","Empréstimo","Financiamento","Crédito"]
        .includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);

    case "geracao_caixa":
      const receb = transactions.filter((t) => Number(t.amount) > 0).reduce((acc, t) => acc + Number(t.amount), 0);
      const pag = transactions.filter((t) => Number(t.amount) < 0).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
      return receb - pag;

    case "transferencias":
      return transactions.filter((t) => ["Transferência", "Depósito", "Saque"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "entre_contas":
      return transactions.filter((t) => t.category === "Transferência").reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
    case "dinheiro":
      return transactions.filter((t) => ["Depósito", "Saque"].includes(t.category)).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);

    case "saldo_final":
      const saldoAnterior = 0;
      const caixaGerado = (() => {
        const receb = transactions.filter((t) => Number(t.amount) > 0).reduce((acc, t) => acc + Number(t.amount), 0);
        const pag = transactions.filter((t) => Number(t.amount) < 0).reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
        return receb - pag;
      })();
      return saldoAnterior + caixaGerado;
    default:
      return 0;
  }
}

interface CashFlowTablePFProps {
  transactions: Transaction[];
}

export default function CashFlowTablePF({ transactions }: CashFlowTablePFProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragData = React.useRef<{ isDragging: boolean; startX: number; scrollLeft: number }>({ isDragging: false, startX: 0, scrollLeft: 0 });

  const monthLabels = React.useMemo(() => getMonthLabels(transactions), [transactions]);
  const transactionsByMonth = React.useMemo(() => groupTransactionsByMonth(transactions), [transactions]);

  const handleExpandToggle = (rowId: string) => {
    setExpanded((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  // Drag-to-scroll handlers
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // só botão esquerdo
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
      const walk = (x - dragData.current.startX);
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
      const walk = (x - touchStartX);
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

  // Renderiza as linhas principais e expande subcategorias em linhas separadas
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
            borderBottom: "1px solid #F13E8E",
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
            borderRight: "2px solid #F13E8E",
            boxShadow: "2px 0 0 #fff",
            color: "#0B1F75",
            borderBottom: "1px solid #F13E8E",
            whiteSpace: "nowrap",
            py: 1.5,
            cursor: "move",
            userSelect: "none",
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
              onClick={(e) => { e.stopPropagation(); handleExpandToggle(row.id); }}
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
              borderRight: idx < monthLabels.length - 1 ? "1px solid #F13E8E" : "none",
              background: highlight ? HIGHLIGHT_BG : "#fff",
              minWidth: 150,
              whiteSpace: "nowrap",
              py: 1.5,
              color: "#0B1F75",
              borderBottom: "1px solid #F13E8E",
              cursor: "move",
              userSelect: "none",
            }}
          >
            {formatCurrency(calculateRowValue(row.id, transactionsByMonth[month.key] || []))}
          </TableCell>
        ))}
      </TableRow>
    );

    const childrenRows = hasChildren && isExpanded
      ? row.children.map((child: any) => (
          <TableRow key={child.id} sx={{
            bgcolor: "#fff",
            "& td": {
              borderBottom: "1px solid #F13E8E",
              cursor: "move",
              userSelect: "none",
            }
          }}>
            <TableCell
              sx={{
                position: "sticky",
                left: 0,
                zIndex: 2,
                background: "#fff",
                minWidth: 260,
                borderRight: "2px solid #F13E8E", // linha vertical de 2px sempre
                boxShadow: "2px 0 0 #fff",
                pl: 2,
                py: 0.5,
                color: "#0B1F75",
                fontSize: "1rem",
                fontWeight: 400, // sem negrito
                borderBottom: "1px solid #F13E8E",
                whiteSpace: "nowrap",
                cursor: "move",
                userSelect: "none",
              }}
            >
              {child.label}
            </TableCell>
            {monthLabels.map((month, colIdx) => (
              <TableCell
                key={month.key}
                align="left"
                sx={{
                  borderRight: colIdx < monthLabels.length - 1 ? "1px solid #F13E8E" : "none",
                  background: "#fff",
                  minWidth: 150,
                  whiteSpace: "nowrap",
                  py: 0.5,
                  color: "#0B1F75",
                  fontSize: "1rem",
                  fontWeight: 400, // sem negrito
                  borderBottom: "1px solid #F13E8E",
                  cursor: "move",
                  userSelect: "none",
                }}
              >
                {formatCurrency(calculateRowValue(child.id, transactionsByMonth[month.key] || []))}
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

  // Scrollbar oculta, aparece só durante scroll/drag
  // Drag-to-scroll ativado em toda TableContainer
  return (
    <Box sx={{ width: "100%", bgcolor: "#fff", borderRadius: 2, boxShadow: 2, my: 3, p: 2 }}>
      <Typography variant="h5" color="primary" fontWeight={700} mb={2}>
        Seu Fluxo de Caixa Pessoal
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
          border: "1px solid #F13E8E",
          borderRadius: 2,
          cursor: "grab",
          // Scrollbar só aparece durante scroll/drag ou hover
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
            background: "#F13E8E",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#fff",
          },
          // Firefox
          scrollbarColor: "#F13E8E #fff",
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
                  borderRight: "2px solid #F13E8E",
                  boxShadow: "2px 0 0 #fff",
                  borderBottom: "1px solid #F13E8E",
                  whiteSpace: "nowrap",
                  py: 1.5,
                  cursor: "move",
                  userSelect: "none",
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
                    borderRight: idx < monthLabels.length - 1 ? "1px solid #F13E8E" : "none",
                    minWidth: 150,
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid #F13E8E",
                    py: 1.5,
                    cursor: "move",
                    userSelect: "none",
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
      {/* Estilos globais extras para Safari e navegadores baseados em Webkit */}
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