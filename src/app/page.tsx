import { Header } from '@/components/landing-page/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Bot, Coins } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Seção Principal (Hero) */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-white shadow-sm">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-blue-900 sm:text-5xl md:text-6xl lg:text-7xl">
              Inteligência Financeira ao seu Alcance
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mt-6">
              O Oráculo combina controle de despesas e o poder da IA para te dar clareza e controle sobre seu dinheiro. Chega de planilhas, comece a planejar seu futuro.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg px-8 py-6 text-lg">
                <Link href="/signup">
                  Comece Grátis e Organize-se 
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Seção "Como Funciona?" */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 font-semibold mb-2">Como Funciona?</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-900">Simples, Rápido e Inteligente.</h2>
                <p className="max-w-[700px] mx-auto text-gray-500 md:text-lg mt-4">
                  Em três passos, você transforma dados em decisões e alcança seus objetivos financeiros.
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-3">
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-4">
                    <div className="bg-pink-100 p-4 rounded-full">
                        <Coins className="h-8 w-8 text-pink-600" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-blue-800">1. Registre suas Finanças</h3>
                <p className="text-gray-600">
                  Conecte suas contas ou cadastre suas receitas e despesas de forma rápida. A organização é o primeiro passo para o controle.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-4">
                    <div className="bg-pink-100 p-4 rounded-full">
                        <BarChart className="h-8 w-8 text-pink-600" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-blue-800">2. Visualize seus Gastos</h3>
                <p className="text-gray-600">
                  Nossos gráficos intuitivos mostram para onde seu dinheiro está indo. Identifique padrões, veja oportunidades de economia e acompanhe seu progresso.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center items-center mb-4">
                    <div className="bg-pink-100 p-4 rounded-full">
                        <Bot className="h-8 w-8 text-pink-600" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-blue-800">3. Converse com a IA</h3>
                <p className="text-gray-600">
                  Pergunte ao Oráculo. Peça dicas de economia, análises de gastos ou sugestões de investimento. A IA está aqui para te ajudar a tomar as melhores decisões.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção "Exemplos de Uso" */}
        <section id="use-cases" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-900">
                        Para o dia a dia e para o futuro.
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Veja como o Oráculo se encaixa na sua vida, seja no celular ou no computador.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="flex flex-col items-center">
                        <Image src="https://placehold.co/500x350/E9D8FD/4F46E5?text=Dashboard+no+PC" alt="Dashboard no Desktop" width={500} height={350} className="rounded-lg shadow-lg" />
                        <p className="mt-4 text-lg font-semibold text-blue-800">Visão Completa no seu Computador</p>
                        <p className="text-gray-600 max-w-sm">Acesse gráficos detalhados e planeje suas finanças com a conveniência de uma tela grande.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src="https://placehold.co/280x500/E9D8FD/4F46E5?text=IA+no+Celular" alt="Chat com IA no Celular" width={280} height={500} className="rounded-lg shadow-lg" />
                         <p className="mt-4 text-lg font-semibold text-blue-800">Insights na Palma da Mão</p>
                        <p className="text-gray-600 max-w-sm">Tire dúvidas e receba dicas da nossa IA onde quer que você esteja, direto do seu celular.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <footer className="w-full py-8 bg-white border-t">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="text-center md:text-left mb-4 md:mb-0">
                <p>&copy; {new Date().getFullYear()} Oráculo Financeiro. Todos os direitos reservados.</p>
                <p className="mt-1">Feito com muito ☕ e 🤖 por Victão</p>
            </div>
            <div className="text-center md:text-right">
                <p>Respeitamos a sua privacidade. <Link href="/privacy" className="font-semibold text-blue-700 hover:underline">Política de Privacidade (LGPD)</Link></p>
                <p className="mt-1">Contato: <a href="mailto:sistemaoraculoia@gmail.com" className="font-semibold text-blue-700 hover:underline">sistemaoraculoia@gmail.com</a></p>
            </div>
          </div>
      </footer>
    </div>
  );
}
