"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ReferenceLine,
} from "recharts";

// Interface dos dados
export interface SaldoMes {
  key: string;
  label: string;
  saldoFinal: number;
}

export default function CashFlowLineChartPF({
  saldosFinaisPorMes,
}: {
  saldosFinaisPorMes: SaldoMes[];
}) {
  // Organiza do mais recente para o mais antigo
  const chartData = [...saldosFinaisPorMes]
    .sort((a, b) => (a.key < b.key ? 1 : -1))
    .map((month) => ({
      name: month.label,
      saldoFinal: month.saldoFinal,
      key: month.key, // Para key nos dots!
    }));

  // Dot customizado com key, para evitar warning do React!
  const renderDot = (props: any) => {
    const { cx, cy, value, index, payload } = props;
    if (value === null || value === undefined) return null;
    // Key é o mês + valor para garantir unicidade
    const dotKey = `${payload?.key ?? index}-${value}`;
    const color = value >= 0 ? "#2B3FAE" : "#F13E8E";
    return (
      <circle
        key={dotKey}
        cx={cx}
        cy={cy}
        r={7}
        fill={color}
        stroke={color}
        strokeWidth={2}
      />
    );
  };

  // Tooltip customizada
  function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
      const saldo = payload[0]?.value;
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "8px 12px",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.07)",
          }}
        >
          <div style={{ fontWeight: 500 }}>{label.replace(".", "")}</div>
          <div style={{ color: saldo >= 0 ? "#2B3FAE" : "#F13E8E", fontWeight: 600 }}>
            Saldo final do mês:&nbsp;
            {saldo !== undefined
              ? `R$ ${Number(saldo).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`
              : ""}
          </div>
        </div>
      );
    }
    return null;
  }

  // Legenda customizada
  function renderLegend() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginTop: 12,
        fontWeight: 500,
        fontSize: '1rem',
        width: '100%',
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="30" height="8">
            <line x1="0" y1="4" x2="30" y2="4" stroke="#333" strokeWidth="4" />
          </svg>
          Saldo final do mês (linha contínua)
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="22" height="12">
            <circle cx="11" cy="6" r="6" fill="#2B3FAE" />
          </svg>
          Saldo positivo
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="22" height="12">
            <circle cx="11" cy="6" r="6" fill="#F13E8E" />
          </svg>
          Saldo negativo
        </span>
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "#fff", boxShadow: 2, my: 3, px: 2, pt: 2 }}>
      <Typography variant="h6" color="primary" fontWeight={700} mb={2}>
        Saldo Final Mensal (Linha)
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 30, right: 30, left: 60, bottom: 20 }} // Mais espaço à esquerda!
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
          <ReferenceLine y={0} stroke="#bbb" strokeDasharray="4 4" />
          {/* Linha contínua, cor cinza escuro, dots coloridos conforme valor */}
          <Line
            type="monotone"
            dataKey="saldoFinal"
            stroke="#333"
            strokeWidth={4}
            dot={renderDot}
            activeDot={renderDot}
            isAnimationActive={false}
            name="Saldo final do mês"
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}