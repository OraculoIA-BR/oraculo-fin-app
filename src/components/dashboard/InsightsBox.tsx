"use client";
import React, { useState } from "react";

// Função para gerar insights e explicações
function gerarInsightsDetalhados(transactions: any[]) {
  if (!transactions || transactions.length === 0)
    return [
      {
        titulo: "Adicione transações para receber insights e dicas únicas.",
        descricao: "Assim que você adicionar suas movimentações financeiras, nossa inteligência irá gerar dicas e alertas personalizados para te ajudar a economizar mais e investir melhor."
      },
    ];

  const gastos = transactions.filter((t) => Number(t.amount) < 0);
  const receitas = transactions.filter((t) => Number(t.amount) > 0);
  const categorias = [...new Set(gastos.map((t) => t.category))];

  const totalGastos = gastos.reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0);
  const totalReceitas = receitas.reduce((acc, t) => acc + Number(t.amount), 0);

  const maiorGasto = gastos.length
    ? gastos.reduce((a, b) => Math.abs(Number(a.amount)) > Math.abs(Number(b.amount)) ? a : b)
    : null;

  const insights: { titulo: string; descricao: string }[] = [];

  if (totalGastos > 0) {
    insights.push({
      titulo: "Seus gastos totais estão altos! Descubra como evitar desperdícios e ter mais dinheiro sobrando todo mês.",
      descricao: `Seu total de gastos até agora é de R$ ${totalGastos.toFixed(2)}. Reveja as maiores despesas e crie metas de economia para os próximos meses. Dica: Use categorias para identificar onde mais pode cortar!`
    });
  }
  if (totalReceitas > 0) {
    insights.push({
      titulo: "Parabéns pelas receitas recebidas! Veja como multiplicar esse valor e crescer seu patrimônio.",
      descricao: `Você recebeu R$ ${totalReceitas.toFixed(2)} em receitas neste período. Que tal separar uma parte para investir ou criar uma reserva financeira? O futuro agradece!`
    });
  }
  if (maiorGasto) {
    insights.push({
      titulo: `Atenção: Seu maior gasto foi com ${maiorGasto.category}! Veja como economizar nessa área.`,
      descricao: `Seu maior gasto foi com "${maiorGasto.category}" (${maiorGasto.description}) no valor de R$ ${Math.abs(Number(maiorGasto.amount)).toFixed(2)}. Considere pesquisar alternativas ou negociar descontos, especialmente se for recorrente!`
    });
  }
  if (categorias.length > 2) {
    insights.push({
      titulo: "Seus gastos estão distribuídos em diversas categorias! Veja como organizar melhor seu orçamento.",
      descricao: `Você gastou em pelo menos ${categorias.length} categorias diferentes. Organize seu orçamento por categoria e monitore aquelas que estão crescendo mais rápido. Use metas por categoria para não extrapolar.`
    });
  }
  const apps = gastos.filter((t) => t.category === "Aplicativo");
  if (apps.length > 0) {
    const assinaturas = apps.map((t) => t.description).join(", ");
    insights.push({
      titulo: "Assinaturas de aplicativos podem ser revisadas para economizar mais! Veja exemplos e corte o que não usa.",
      descricao: `Você tem gastos recorrentes com aplicativos. Reveja assinaturas que não utiliza para economizar. Exemplos encontrados: ${assinaturas}`
    });
  }

  return insights.slice(0, Math.max(3, Math.min(5, insights.length)));
}

interface InsightsBoxProps {
  transactions: any[];
}

const InsightsBox: React.FC<InsightsBoxProps> = ({ transactions }) => {
  const insights = gerarInsightsDetalhados(transactions);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full mb-6">
      <h2 className="text-2xl font-bold mb-8 flex items-center text-[#0B1F75]">
        <span className="mr-2">🧠</span> Insights Financeiros da Inteligência Artificial
      </h2>
      {/* gap-1 para espaço mínimo entre os cards */}
      <div className="flex flex-col gap-1">
        {insights.map((insight, idx) => (
          <div key={idx} className="border rounded p-4 bg-gray-50 w-full">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span
                className="font-semibold flex items-center"
                style={{
                  color: "#0B1F75",
                  fontSize: "100%",
                  fontWeight: 600,
                }}
              >
                <span className="mr-2">💡</span>
                {insight.titulo}
              </span>
              <button
                className="ml-4 text-lg text-gray-700"
                aria-label={openIdx === idx ? "Fechar explicação" : "Ver explicação"}
              >
                {openIdx === idx ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M6 15l6-6 6 6" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
            {openIdx === idx && (
              <div
                className="mt-2 bg-white rounded p-2 border"
                style={{
                  color: "#0B1F75",
                  fontSize: "100%",
                }}
              >
                {insight.descricao}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsBox;