// src/app/login/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Redireciona para o dashboard se o usuário já estiver logado
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  // Mapeia erros do Firebase para mensagens amigáveis
  const getFriendlyErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.";
      case "auth/user-not-found":
        return "Nenhuma conta encontrada com este e-mail. Por favor, cadastre-se.";
      case "auth/wrong-password":
        return "Senha incorreta. Por favor, tente novamente.";
      case "auth/network-request-failed":
        return "Falha de conexão. Verifique sua internet e tente novamente.";
      default:
        return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Sucesso!", description: "Login realizado com sucesso." });
      // O useEffect cuidará do redirecionamento
    } catch (error: any) {
      console.error("Erro no Login com E-mail:", error.code, error.message);
      const message = getFriendlyErrorMessage(error.code);
      toast({ title: "Erro de Login", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({ title: "Sucesso!", description: "Login com Google realizado com sucesso." });
      // O useEffect cuidará do redirecionamento
    } catch (error: any) {
      console.error("Erro no Login com Google:", error.code, error.message);
      const message = getFriendlyErrorMessage(error.code);
      toast({ title: "Erro de Login", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Exibe um loader enquanto a sessão é verificada
  if (authLoading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="inline-block mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-blue-900">Bem-vindo de Volta!</h1>
          <p className="text-gray-500">Acesse sua conta para ver suas finanças.</p>
        </div>
        
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required disabled={loading} className="text-blue-900"/>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" required disabled={loading} className="text-blue-900"/>
          </div>
          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...</> : "Entrar"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-white text-gray-500">Ou entre com</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="w-5 h-5 mr-2" />}
          Entrar com Google
        </Button>

        <p className="text-sm text-center text-gray-500">
          Não tem uma conta?{" "}
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
