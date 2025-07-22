
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { generateSavingSuggestions, type GenerateSavingSuggestionsOutput } from '@/ai/flows/generate-saving-suggestions';
import { Logo } from '@/components/logo';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { FinancialSearch } from '@/components/dashboard/financial-search';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SavingSuggestions } from '@/components/dashboard/saving-suggestions';
import { WhatsAppFAB } from '@/components/dashboard/whatsapp-fab';
import { auth, signOut } from '@/lib/firebase';
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

// This is a placeholder for the actual data fetching.
// In a real application, you would fetch this data from your backend.
async function getSavingSuggestions(): Promise<GenerateSavingSuggestionsOutput> {
  return generateSavingSuggestions({
    financialSituation: 'Renda mensal de R$5000, despesas fixas de R$2500, despesas variáveis de R$1500.',
    savingGoals: 'Comprar um carro novo em 2 anos e fazer uma viagem internacional.',
  });
}


export default function DashboardPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [suggestions, setSuggestions] = React.useState<GenerateSavingSuggestionsOutput['suggestions']>([]);

  useEffect(() => {
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
    await signOut();
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-blue-900">
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 w-full border-b bg-primary">
          <div className="container mx-auto flex h-16 items-center justify-between space-x-4">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "Usuário"} />
                    <AvatarFallback>{user?.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
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
