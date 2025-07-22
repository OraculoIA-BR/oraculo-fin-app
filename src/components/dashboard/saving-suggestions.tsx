import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { GenerateSavingSuggestionsOutput } from "@/ai/flows/generate-saving-suggestions"
import { Lightbulb } from "lucide-react"

interface SavingSuggestionsProps {
  suggestions: GenerateSavingSuggestionsOutput['suggestions'];
}

export function SavingSuggestions({ suggestions }: SavingSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dicas de Economia do Oráculo</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {suggestions.map((suggestion, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <div className="flex items-center gap-3 font-semibold text-primary">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <span>{suggestion.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pl-3 border-l-2 border-accent ml-5">
                <p className="text-muted-foreground">{suggestion.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Exemplo prático:</h4>
                  <p className="text-sm p-3 bg-muted rounded-md border">{suggestion.example}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
