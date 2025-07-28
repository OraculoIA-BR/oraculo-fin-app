"use client";
import { useExemplos } from "@/hooks/useExemplos";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function ExemplosPage() {
  const { exemplos, loading } = useExemplos();
  const { user } = useAuth();

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Faça login para ver seus exemplos.</div>;

  return (
    <div>
      <h1>Seus Exemplos</h1>
      <Link href="/exemplos/novo">
        <button>Novo Exemplo</button>
      </Link>
      {exemplos.length === 0 ? (
        <p>Nenhum exemplo cadastrado!</p>
      ) : (
        <ul>
          {exemplos.map((ex) => (
            <li key={ex.id}>
              <strong>{ex.title}</strong>: {ex.description}
              <br />
              <em>{ex.example}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}