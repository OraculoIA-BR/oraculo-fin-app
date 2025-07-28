"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addExemplo } from "@/services/exemploService";
import { useRouter } from "next/navigation";

export default function NovoExemploPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await addExemplo(user.uid, { title, description, example });
    setLoading(false);
    router.push("/exemplos");
  }

  if (!user) return <div>Faça login para adicionar exemplos.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Exemplo</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Descrição"
        required
      />
      <input
        value={example}
        onChange={e => setExample(e.target.value)}
        placeholder="Exemplo"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}