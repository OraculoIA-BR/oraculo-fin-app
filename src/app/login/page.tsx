"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GoogleIcon } from "@/components/icons/google-icon";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Sucesso!", description: "Login realizado com sucesso." });
      router.push("/dashboard");
    } catch (error: any) {
      setError("Email ou senha inválidos. Tente novamente.");
      toast({ title: "Erro de Login", description: "Email ou senha inválidos.", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Sucesso!", description: "Login com Google realizado com sucesso." });
      router.push("/dashboard");
    } catch (error: any) {
      setError("Falha ao fazer login com o Google.");
      toast({ title: "Erro de Login", description: "Não foi possível fazer login com o Google.", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold">Oráculo Financeiro</h1>
          <p className="text-gray-500">Acesse sua conta para continuar</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="text-blue-900"
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="text-blue-900"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
          <GoogleIcon className="w-5 h-5 mr-2" />
          Entrar com Google
        </Button>

        <p className="text-sm text-center text-gray-500">
          Não tem uma conta?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
