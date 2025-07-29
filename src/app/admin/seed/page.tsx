"use client";

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ManualSeedPage() {
  const [uid, setUid] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsLoading(true);

    if (!uid.trim()) {
      setStatusMessage("Erro: O campo UID do usuário é obrigatório.");
      setIsLoading(false);
      return;
    }

    let transactionsData;
    try {
      transactionsData = JSON.parse(jsonText);
    } catch (err) {
      setStatusMessage("Erro: O texto no campo de dados não é um JSON válido.");
      setIsLoading(false);
      return;
    }

    const transactionsArray = Array.isArray(transactionsData) ? transactionsData : [transactionsData];
    let successCount = 0;
    let failCount = 0;

    for (const tx of transactionsArray) {
      try {
        const transactionsCollectionRef = collection(db, "users", uid, "transactions");
        await addDoc(transactionsCollectionRef, tx);
        successCount++;
      } catch (err) {
        console.error("Falha ao cadastrar transação:", err);
        failCount++;
      }
    }

    setStatusMessage(`Cadastro concluído! Sucesso: ${successCount}. Falhas: ${failCount}.`);
    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h1>Ferramenta de Cadastro Manual</h1>
      <p style={{ color: "#555" }}>Use esta página para adicionar transações de teste a um usuário específico.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="uid-input" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            1. UID do Usuário
          </label>
          <input
            id="uid-input"
            type="text"
            value={uid}
            onChange={e => setUid(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            placeholder="Cole o UID do usuário do Firebase Authentication"
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="json-input" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            2. Dados da Transação (em formato JSON)
          </label>
          <textarea
            id="json-input"
            value={jsonText}
            onChange={e => setJsonText(e.target.value)}
            style={{ width: "100%", height: 200, padding: "8px", boxSizing: "border-box", fontFamily: "monospace" }}
            placeholder={`Cole um objeto JSON ou um array de objetos.

Exemplo:
{
  "amount": "-145.50",
  "currency": "BRL",
  "category": "Mercado",
  "description": "Compras da semana",
  "timestamp": "2025-08-01T10:00:00Z",
  "transactionId": "tx-manual-01"
}`}
            required
          />
        </div>

        <button type="submit" disabled={isLoading} style={{ padding: "10px 15px", cursor: "pointer", width: "100%" }}>
          {isLoading ? "Cadastrando..." : "Cadastrar Transações no Firestore"}
        </button>
      </form>

      {statusMessage && (
        <div style={{ marginTop: "1rem", padding: "10px", border: "1px solid", borderRadius: "4px", backgroundColor: statusMessage.startsWith("Erro") ? "#ffebee" : "#e8f5e9" }}>
          {statusMessage}
        </div>
      )}
    </div>
  );
}