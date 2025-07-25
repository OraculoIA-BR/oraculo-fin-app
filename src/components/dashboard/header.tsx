// src/components/dashboard/header.tsx
"use client";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { LogOut } from "lucide-react";

export const Header = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const auth = getAuth();

    const handleLogout = async () => {
        try {
          await signOut(auth);
          toast({
            title: "Logout realizado",
            description: "Você foi desconectado com sucesso.",
          });
          router.push('/login');
        } catch (error) {
          toast({
            title: "Erro no Logout",
            description: "Não foi possível fazer o logout. Tente novamente.",
            variant: "destructive",
          });
        }
      };

    return (
        <header className="bg-pink-600 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              {user && <span className="text-sm text-white hidden md:block">Olá, {user.displayName || user.email}</span>}
              <Button variant="outline" size="sm" onClick={handleLogout} className="bg-transparent text-white border-white hover:bg-white hover:text-pink-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
        </div>
      </header>
    )
}