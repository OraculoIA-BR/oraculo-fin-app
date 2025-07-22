"use client";

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2 } from 'lucide-react';
import { handleFinancialQuestion } from '@/app/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export function FinancialSearch() {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer('');

    try {
      const result = await handleFinancialQuestion({ question });
      setAnswer(result.answer);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching financial answer:", error);
      setAnswer("Desculpe, não consegui encontrar uma resposta. Tente novamente mais tarde.");
      setIsDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pergunte ao Oráculo</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Tem alguma dúvida sobre suas finanças? O Oráculo pode ajudar.
        </p>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Ex: Como posso começar a investir com pouco dinheiro?"
              className="pl-10"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading || !question.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Perguntar'}
          </Button>
        </form>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Resposta do Oráculo</DialogTitle>
              <DialogDescription>
                Esta é uma sugestão baseada em sua pergunta.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 whitespace-pre-wrap">{answer}</div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
