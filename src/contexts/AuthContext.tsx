// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

// Define o tipo para o valor do contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente Provedor de Autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Escuta por mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Lógica de redirecionamento
      const isAuthPage = pathname === "/login" || pathname === "/signup";
      
      if (user) {
        // Se o usuário está logado e tenta acessar login/signup, redireciona para o dashboard
        if (isAuthPage) {
          router.push("/dashboard");
        }
      } else {
        // Se o usuário não está logado e tenta acessar uma página protegida (que não seja a home, login ou signup)
        if (pathname !== "/" && !isAuthPage) {
           router.push("/login");
        }
      }
    });

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe();
  }, [pathname, router]);

  const value = { user, loading };

  // Mostra um loader global enquanto verifica a autenticação
  // mas não para as paginas de autenticação
  if (loading && pathname !== "/login" && pathname !== "/signup" && pathname !== "/") {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );
  }


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
