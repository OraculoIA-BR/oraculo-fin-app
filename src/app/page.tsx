import { Header } from '@/components/landing-page/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Seção Principal */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-900">
              Transforme Sua Vida Financeira com o Oráculo
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4">
              Sua plataforma inteligente para controle de gastos, planejamento e insights que realmente fazem a diferença.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/signup">Comece Agora, é Grátis!</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Seção de Recursos */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-700">Recursos Principais</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900">Tudo que você precisa para tomar as rédeas</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Deixe a complexidade para nós. Foque no que importa: seus objetivos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-blue-800">Controle de Despesas</h3>
                <p className="text-sm text-gray-500">
                  Cadastre suas transações de forma simples e veja para onde seu dinheiro está indo.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-blue-800">Planejamento e Metas</h3>
                <p className="text-sm text-gray-500">
                  Crie orçamentos, defina metas de economia e acompanhe seu progresso em tempo real.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-blue-800">Insights com IA</h3>
                <p className="text-sm text-gray-500">
                  Receba sugestões inteligentes e personalizadas para otimizar suas finanças.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <footer className="w-full py-6 bg-white border-t">
          <div className="container mx-auto px-4 md:px-6 text-center text-sm text-gray-500">
            © 2024 Oráculo Financeiro. Todos os direitos reservados.
          </div>
      </footer>
    </div>
  );
}
