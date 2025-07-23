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

// O tipo de mensagem agora corresponde ao que a IA espera
type Message = {
  role: 'user' | 'model'; // 'assistant' foi trocado para 'model'
  content: string;
};

export function FinancialSearch() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // A referência agora é para o DIV que contém as mensagens
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // O efeito agora rola o DIV container, não a página inteira
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage: Message = { role: 'user', content: query };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);
    setQuery('');

    try {
      // Agora enviamos o histórico da conversa junto com a nova pergunta
      const result: FinancialQuestionOutput = await answerFinancialQuestion({
        question: query,
        history: messages, // Enviando o histórico
      });
      
      const assistantMessage: Message = { role: 'model', content: result.answer };
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
    // Card principal agora tem altura fixa e usa flexbox em coluna
    <Card className="flex flex-col h-[60vh] max-h-[700px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Logo />
          <span className="ml-2">Converse com o Oráculo</span>
        </CardTitle>
      </CardHeader>
      {/* O conteúdo do Card agora se expande e contém o scroll */}
      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* Este DIV é a "janela" de mensagens, com scroll interno */}
        <div ref={messageContainerRef} className="flex-1 overflow-y-auto pr-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'model' && (
                <Avatar className="h-8 w-8">
                  {/* Atualizei a URL da imagem para uma mais estável */}
                  <AvatarImage src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28.png" alt="Oráculo" />
                  <AvatarFallback>O</AvatarFallback>
                </Avatar>
              )}
              {/* Adicionado 'break-words' para quebrar o texto corretamente */}
              <div className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
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
