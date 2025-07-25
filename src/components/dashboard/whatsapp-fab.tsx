// src/components/dashboard/whatsapp-fab.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * Botão flutuante (FAB) para iniciar uma conversa no WhatsApp.
 * O número e a mensagem são configuráveis via variáveis de ambiente.
 */
export function WhatsAppFAB() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999"; // Fallback para um número genérico
  const defaultMessage = "Olá! Gostaria de saber mais sobre o Oráculo Financeiro.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-transform hover:scale-110"
            aria-label="Converse com o Oráculo no WhatsApp"
          >
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-8 w-8 text-white" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Fale com nosso especialista</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
