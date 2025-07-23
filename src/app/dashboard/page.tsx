'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { generateSavingSuggestions, type GenerateSavingSuggestionsOutput } from '@/ai/flows/generate-saving-suggestions';

import { Logo } from '@/components/logo';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { FinancialSearch } from '@/components/dashboard/financial-search';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SavingSuggestions } from '@/components/dashboard/saving-suggestions';
import { WhatsAppFAB } from '@/components/dashboard/whatsapp-fab';
import { Button } from '@/components/ui/button';
import { LogOut, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from '@/hooks/use-toast';

// Placeholder. Em um app real, isso viria do backend.
async function getSavingSuggestions(): Promise<GenerateSavingSuggestionsOutput> {
  return generateSavingSuggestions({
    financialSituation: 'Renda mensal de R$5000, despesas fixas de R$2500, despesas variáveis de R$1500.',
    savingGoals: 'Comprar um carro novo em 2 anos e fazer uma viagem internacional.',
  });
}


export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = React.useState<GenerateSavingSuggestionsOutput['suggestions']>([]);

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  React.useEffect(() => {
    if(user) {
      getSavingSuggestions().then(output => setSuggestions(output.suggestions));
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Você saiu!", description: "Até a próxima!" });
      router.push('/login');
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível sair.", variant: "destructive" });
    }
  };
  
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 w-full border-b bg-background">
          <div className="container mx-auto flex h-16 items-center justify-between space-x-4">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "Usuário"} />
                    <AvatarFallback>{user?.displayName?.charAt(0) ?? user?.email?.charAt(0)?.toUpperCase() ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName ?? 'Usuário'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 container mx-auto">
          <div className="grid gap-6 md:gap-8">
            <SummaryCards />
            
            <div className="grid gap-6 md:gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3 space-y-6">
                <FinancialSearch />
                <RecentTransactions />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <SpendingChart />
              </div>
            </div>
            
            <SavingSuggestions suggestions={suggestions} />
          </div>
        </main>
        <WhatsAppFAB />
      </div>
    </div>
  );
}
