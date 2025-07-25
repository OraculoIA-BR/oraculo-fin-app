// src/components/dashboard/saving-suggestions.tsx
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import type { GenerateSavingSuggestionsOutput } from "@/ai/flows/generate-saving-suggestions"
  import { Lightbulb, Target, TrendingUp } from "lucide-react"
  
  interface SavingSuggestionsProps {
    suggestions: GenerateSavingSuggestionsOutput['suggestions'];
  }
  
  /**
   * Componente que exibe sugestões de economia geradas pela IA.
   * Utiliza um acordeão para mostrar os detalhes de cada sugestão.
   */
  export function SavingSuggestions({ suggestions }: SavingSuggestionsProps) {
    if (!suggestions || suggestions.length === 0) {
      // Não renderiza nada se não houver sugestões.
      return null;
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Target className="h-6 w-6" />
            <span>Dicas de Economia do Oráculo</span>
          </CardTitle>
          <CardDescription>
            Sugestões personalizadas da nossa IA para te ajudar a alcançar seus objetivos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {suggestions.map((suggestion, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3 font-semibold text-blue-800">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>{suggestion.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-4 border-l-2 border-yellow-500 ml-4">
                  <p className="text-gray-600">{suggestion.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Exemplo Prático:
                    </h4>
                    <p className="text-sm p-3 bg-gray-100 rounded-md border text-gray-700">{suggestion.example}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    )
  }
  