"use client";
import React, { useState } from "react";

interface ChatOraculoProps {
  iaResponse: string;
  onSend: (msg: string) => void;
  loading?: boolean;
}

export function ChatOraculo({ iaResponse, onSend, loading }: ChatOraculoProps) {
  const [input, setInput] = useState("");
  const [showFull, setShowFull] = useState(false);
  const charLimit = 350;

  const displayedText =
    !showFull && iaResponse.length > charLimit
      ? iaResponse.slice(0, charLimit) + "..."
      : iaResponse;

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full mb-6">
      <h2 className="text-2xl font-bold mb-2 flex items-center">
        <span className="mr-2">🧠</span> Oráculo Converse com o Oráculo
      </h2>
      <div className="mb-4">
        <div
          className="overflow-y-auto transition-all"
          style={{ maxHeight: showFull ? "none" : "110px" }}
        >
          {displayedText}
        </div>
        {iaResponse.length > charLimit && (
          <button
            className="text-blue-600 text-sm mt-2"
            onClick={() => setShowFull((v) => !v)}
          >
            {showFull ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </div>
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            onSend(input.trim());
            setInput("");
          }
        }}
      >
        <input
          type="text"
          className="flex-1 border rounded-l px-4 py-2"
          placeholder="Pergunte sobre suas finanças..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-r"
          disabled={loading}
        >
          {loading ? <span className="animate-spin">⏳</span> : "Enviar"}
        </button>
      </form>
    </div>
  );
}