import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function WhatsAppFAB() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
            aria-label="Converse com o Oráculo no WhatsApp"
          >
            <Link href="https://wa.me/your-number-here" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-8 w-8 text-white" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Converse com o Oráculo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
