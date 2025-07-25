// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; 
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    // Garante que a inscrição seja desfeita quando o componente for desmontado.
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Evita o redirecionamento enquanto a autenticação ainda está carregando.
    if (loading) {
      return;
    }
    
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    // Se o usuário está autenticado e tenta acessar as páginas de login/cadastro,
    // ele é redirecionado para o dashboard.
    if (user && isAuthPage) {
      router.push("/dashboard");
    } 
    // Se o usuário não está autenticado e tenta acessar uma página protegida
    // (qualquer uma, exceto a inicial, login ou signup), ele é redirecionado para o login.
    else if (!user && !isAuthPage && pathname !== "/") {
      router.push("/login");
    }
  }, [user, loading, pathname, router]);


  // Exibe um loader em tela cheia para páginas protegidas enquanto o estado de autenticação é verificado.
  // Isso evita um "flash" da página de login antes do redirecionamento para o dashboard.
  if (loading && pathname !== "/" && pathname !== "/login" && pathname !== "/signup") {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para acessar o contexto de autenticação.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
