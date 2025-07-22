
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { Loader2 } from 'lucide-react';
import { signInWithGoogle, auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/icons/google-icon';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setIsLoading(true);
    setError(null);
    // Adicionar lógica de cadastro aqui
    console.log('Cadastrando com:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula a chamada de API
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
       // O useEffect cuidará do redirecionamento
    } catch (err) {
      setError('Falha ao fazer login com o Google.');
      console.error(err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (loading || user) {
    return (
     <div className="flex items-center justify-center min-h-screen bg-background">
       <Loader2 className="h-10 w-10 animate-spin text-primary" />
     </div>
   );
 }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto">
         <div className="flex justify-center mb-6">
            <Logo className="h-20 w-auto" />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Cadastro</CardTitle>
            <CardDescription>
              Crie sua conta para começar a usar o Oráculo
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid gap-4">
               <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isGoogleLoading}>
                {isGoogleLoading ? <Loader2 className="animate-spin" /> : <><GoogleIcon className="mr-2 h-4 w-4" /> Cadastre-se com Google</>}
              </Button>
               <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>
              <form onSubmit={handleSignup} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@exemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-blue-900"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-blue-900"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    required 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-blue-900"
                  />
                </div>
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Cadastrar'}
                </Button>
              </form>
            </div>
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{' '}
              <Link href="/login" className="underline">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
