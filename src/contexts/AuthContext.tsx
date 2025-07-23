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

      // Lógica de redirecionamento reativada
      const isAuthPage = pathname === "/login" || pathname === "/signup";
      
      if (user) {
        // Se o usuário está logado e na página de login/cadastro, vai para o dashboard
        if (isAuthPage) {
          router.push("/dashboard");
        }
      } else {
        // Se não está logado e tenta acessar uma página protegida, vai para o login
        // (Ignora a página inicial '/')
        if (pathname !== "/" && !isAuthPage) {
           router.push("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router, user]);

  const value = { user, loading };

  // Loader global para páginas protegidas enquanto a autenticação é verificada
  if (loading && pathname !== "/" && pathname !== "/login" && pathname !== "/signup") {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
