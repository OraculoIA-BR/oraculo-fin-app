"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/logo';
import { ChatMessage } from './chat-message';
import { type Transaction } from "@/services/transactionService";
import { handleFinancialQuestion } from "@/app/actions";

type Message = {
  role: 'user' | 'model';
  content: string;
};

type FinancialSearchProps = {
  transactions: Transaction[];
};

export function FinancialSearch({ transactions }: FinancialSearchProps) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const userName = user?.displayName || user?.email?.split('@')[0] || 'usuário';
    setMessages([
      {
        role: 'model',
        content: `Olá, ${userName}! Sou seu Oráculo Financeiro. Pergunte sobre suas finanças, investimentos ou economia.`
      }
    ]);
  }, [user]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setQuery('');

    try {
      const historyForAI = messages.filter(
        (msg) => !msg.content.startsWith('Olá,')
      );

      const result = await handleFinancialQuestion({
        question: query,
        history: historyForAI,
        userEmail: user?.email,
        transactions,
      });

      const assistantMessage: Message = {
        role: 'model',
        content: result?.answer || '[⚠️ Resposta da IA ausente!]',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Erro ao chamar a Server Action no frontend:", error);
      toast({
        title: 'Erro de Comunicação',
        description: error.message || 'Não foi possível se conectar ao backend. Tente novamente.',
        variant: 'destructive',
      });
      setMessages(prev => prev.slice(0, prev.length - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[60vh] max-h-[700px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Logo />
          <span>Converse com o Oráculo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div ref={messageContainerRef} className="flex-1 overflow-y-auto pr-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))}
        </div>
        {loading && (
          <div className="flex items-center justify-start p-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground ml-2">Oráculo está analisando seus dados...</p>
          </div>
        )}
        <form onSubmit={handleSearch} className="flex items-center gap-2 pt-4 border-t">
          <Input
            type="text"
            placeholder="Pergunte sobre suas finanças..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading} className="bg-oraculo-blue hover:bg-blue-900">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}