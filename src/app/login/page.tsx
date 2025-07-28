"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/exemplos");
    }
  }, [user, loading, router]);

  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      // Após login, o useEffect redireciona
    } catch (err) {
      alert("Erro ao fazer login: " + (err as Error).message);
    }
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Entrar com Google</button>
    </div>
  );
}