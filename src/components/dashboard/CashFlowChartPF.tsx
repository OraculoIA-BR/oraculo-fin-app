"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Scatter,
  ScatterChart,
  Label,
} from "recharts";

// Interface para os dados do saldo por mês
export interface SaldoMes {
  key: string;
  label: string;
  saldoFinal: number;
  recebimentos: number;
  pagamentos: number;
}

export default function CashFlowChartPF({
  saldosFinaisPorMes,
}: {
  saldosFinaisPorMes: SaldoMes[];
}) {
  // Ordena do mais recente para o mais antigo
  const chartData = [...saldosFinaisPorMes]
    .sort((a, b) => (a.key < b.key ? 1 : -1))
    .map((month) => ({
      name: month.label,
      recebimentos: month.recebimentos,
      pagamentos: -month.pagamentos,
      saldoFinal: month.saldoFinal,
    }));

  // Dados para as bolinhas do saldo final
  const scatterData = chartData.map((d) => ({
    name: d.name,
    saldoFinal: d.saldoFinal,
  }));

  // Debug do scatterData
  console.log("scatterData (bolinhas do saldo):", scatterData);

  // Tooltip customizado mostrando saldo final do mês
  function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
      // Pega valor do saldo final da bolinha ou da barra
      const saldo =
        payload.find((p: any) => p.dataKey === "saldoFinal")?.value ||
        payload[0]?.payload?.saldoFinal;
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
          <div style={{ color: "#81A4F7", fontWeight: 600 }}>
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

  // Customiza a legenda e centraliza na tela
  function renderLegend(props: any) {
    const { payload } = props;
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        marginTop: 12,
        fontWeight: 500,
        fontSize: '1rem',
        width: '100%',
      }}>
        {payload.map((entry: any) => {
          if (entry.dataKey === "recebimentos") {
            return (
              <span key="recebimentos" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  width: 20,
                  height: 12,
                  background: "#2B3FAE",
                  display: "inline-block",
                  borderRadius: 2,
                  marginRight: 2,
                }} />
                Recebimentos realizados
              </span>
            );
          }
          if (entry.dataKey === "pagamentos") {
            return (
              <span key="pagamentos" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  width: 20,
                  height: 12,
                  background: "#F13E8E",
                  display: "inline-block",
                  borderRadius: 2,
                  marginRight: 2,
                }} />
                Pagamentos realizados
              </span>
            );
          }
          if (entry.dataKey === "saldoFinal") {
            return (
              <span key="saldoFinal" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  width: 14,
                  height: 14,
                  background: "#81A4F7",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: 2,
                  border: "2px solid #2B3FAE",
                }} />
                Saldo final do mês
              </span>
            );
          }
          return null;
        })}
      </div>
    );
  }

  // Custom shape da bolinha para garantir visibilidade
  const CustomCircle = (props: any) => {
    const { cx, cy } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={7}
        fill="#81A4F7"
        stroke="#2B3FAE"
        strokeWidth={2}
      />
    );
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#fff", boxShadow: 2, my: 3, px: 2, pt: 2 }}>
      <Typography variant="h6" color="primary" fontWeight={700} mb={2}>
        Fluxo de Caixa Mensal - Realizado
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          stackOffset="sign"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* Ajusta o domínio do eixo Y para acomodar valores negativos e positivos */}
          <YAxis domain={['auto', 'auto']}>
            <Label value="R$" position="insideTopLeft" style={{ fill: '#0B1F75', fontWeight: 600 }} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
          <Bar
            dataKey="recebimentos"
            name="Recebimentos realizados"
            fill="#2B3FAE"
            stackId="cash"
            barSize={30}
          />
          <Bar
            dataKey="pagamentos"
            name="Pagamentos realizados"
            fill="#F13E8E"
            stackId="cash"
            barSize={30}
          />
          {/* Bolinha azul claro centralizada para saldo final do mês */}
          <Scatter
            data={scatterData}
            name="Saldo final do mês"
            dataKey="saldoFinal"
            fill="#81A4F7"
            legendType="circle"
            shape={CustomCircle}
            z={2}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}