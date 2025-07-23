"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { answerFinancialQuestion, type FinancialQuestionOutput } from '@/ai/flows/financial-question-answering';
import { Loader2, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from '@/components/logo';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function FinancialSearch() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // 1. Criar a referência para o container das mensagens
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 2. Função para rolar para o final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 3. Efeito que executa a rolagem sempre que as mensagens mudam
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setQuery('');

    try {
      const result: FinancialQuestionOutput = await answerFinancialQuestion({
        question: query,
        // Em um app real, o histórico da conversa seria incluído aqui.
      });
      
      const assistantMessage: Message = { role: 'assistant', content: result.answer };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao buscar resposta',
        description: 'Não foi possível se conectar à IA. Tente novamente.',
        variant: 'destructive',
      });
      // Remove a mensagem do usuário se a API falhar, para que ele possa tentar de novo
      setMessages(prev => prev.slice(0, prev.length -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Logo />
          <span className="ml-2">Converse com o Oráculo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto pr-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.a72d3c5f.png&w=48&q=75" alt="Oráculo" />
                  <AvatarFallback>O</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {/* 4. Adicionar o elemento invisível no final da lista */}
          <div ref={messagesEndRef} />
        </div>
        {loading && (
          <div className="flex items-center justify-center p-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground ml-2">Oráculo está pensando...</p>
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
          <Button type="submit" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
