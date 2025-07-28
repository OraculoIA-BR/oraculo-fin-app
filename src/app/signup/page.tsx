// src/app/signup/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
// --- INÍCIO DA ADIÇÃO ---
import { auth, setupNewUser } from "@/lib/firebase"; // Importa a nova função
// --- FIM DA ADIÇÃO ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GoogleIcon } from "@/components/icons/google-icon";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/logo";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const getFriendlyErrorMessage = (errorCode: string): string => {
    // ... (código existente)
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Erro de Cadastro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      // --- INÍCIO DA ADIÇÃO ---
      // Chama a função para configurar o banco de dados do novo usuário
      await setupNewUser(newUser);
      // --- FIM DA ADIÇÃO ---

      toast({ title: "Sucesso!", description: "Sua conta foi criada e populada com dados de exemplo." });
    } catch (error: any) {
      console.error("Erro no Cadastro com E-mail:", error.code, error.message);
      const message = getFriendlyErrorMessage(error.code);
      toast({ title: "Erro de Cadastro", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const newUser = result.user;
      
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (additionalUserInfo?.isNewUser) {
        // --- INÍCIO DA ADIÇÃO ---
        // Chama a função para configurar o banco de dados apenas para novos usuários do Google
        await setupNewUser(newUser);
        // --- FIM DA ADIÇÃO ---
      }
      
      toast({ title: "Sucesso!", description: "Login com Google realizado com sucesso." });
    } catch (error: any) {
      // ... (código existente)
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
    // --- O RESTANTE DO SEU CÓDIGO JSX PERMANECE O MESMO ---
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
           <div className="inline-block mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-blue-900">Crie sua Conta</h1>
          <p className="text-gray-500">Comece a organizar suas finanças hoje mesmo.</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required disabled={loading} className="text-blue-900" />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required disabled={loading} className="text-blue-900" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repita a senha" required disabled={loading} className="text-blue-900" />
          </div>
          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={loading}>
             {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando conta...</> : "Criar Conta"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-white text-gray-500">Ou cadastre-se com</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon className="w-5 h-5 mr-2" />}
          Cadastrar com Google
        </Button>

        <p className="text-sm text-center text-gray-500">
          Já tem uma conta?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
