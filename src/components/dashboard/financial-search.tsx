"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { handleFinancialQuestion } from '@/app/actions';
import { Loader2, User, Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export function FinancialSearch() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth(); // Usado apenas para personalização

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Adiciona uma mensagem de boas-vindas da IA
  useEffect(() => {
    setMessages([{
      text: `Olá${user ? ', ' + user.displayName?.split(' ')[0] : ''}! Sou seu assistente financeiro. Como posso te ajudar hoje? Pergunte sobre suas finanças, peça dicas de economia ou compare produtos.`,
      sender: 'bot'
    }]);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await handleFinancialQuestion({ question: input });
      const botMessage: Message = { text: result.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching financial answer:', error);
      const errorMessage: Message = {
        text: 'Desculpe, não consegui processar sua pergunta. Tente novamente.',
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="text-blue-900" />
          Converse com o Oráculo
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="bg-blue-900 text-white rounded-full p-2">
                    <Bot size={20} />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="bg-gray-200 text-gray-700 rounded-full p-2">
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="flex items-start gap-3">
                 <div className="bg-blue-900 text-white rounded-full p-2">
                   <Bot size={20} />
                 </div>
                 <div className="rounded-lg px-4 py-2 bg-gray-100 text-gray-900">
                    <Loader2 className="h-5 w-5 animate-spin" />
                 </div>
               </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta financeira..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
