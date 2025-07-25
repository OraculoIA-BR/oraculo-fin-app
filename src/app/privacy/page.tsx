// src/app/privacy/page.tsx
import { Header } from '@/components/landing-page/header';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="prose prose-lg max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1>Política de Privacidade</h1>
            <p className="lead">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            
            <p>
              A sua privacidade é crucial para nós. Esta Política de Privacidade descreve como o Oráculo Financeiro IA coleta, utiliza, armazena e protege suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
            
            <h2>1. Dados Coletados</h2>
            <p>
              Coletamos apenas as informações estritamente necessárias para a prestação dos nossos serviços, sempre com seu consentimento explícito. Os dados coletados incluem:
              <ul>
                <li><strong>Informações de Cadastro:</strong> Nome e endereço de e-mail, utilizados para criar sua conta, garantir sua identificação e permitir a comunicação.</li>
                <li><strong>Dados Financeiros:</strong> Informações sobre suas receitas, despesas, e metas financeiras que você voluntariamente insere na plataforma. Estes dados são a base para a geração de relatórios, gráficos e insights personalizados pela nossa Inteligência Artificial.</li>
              </ul>
            </p>

            <h2>2. Finalidade do Uso de Dados</h2>
            <p>
              Seus dados são utilizados exclusivamente para:
              <ul>
                <li>Operar e manter a funcionalidade principal da plataforma;</li>
                <li>Oferecer uma experiência personalizada, com relatórios e análises financeiras;</li>
                <li>Comunicar-se com você sobre atualizações, suporte técnico e notificações da sua conta;</li>
                <li>Cumprir obrigações legais, incluindo as diretrizes da LGPD.</li>
              </ul>
            </p>
            
            <h2>3. Segurança dos Dados</h2>
            <p>
              Empregamos as melhores práticas de segurança para proteger suas informações. Seus dados são armazenados em um ambiente seguro, utilizando criptografia e medidas técnicas para prevenir acesso não autorizado, perda, roubo ou qualquer forma de divulgação indevida. O acesso aos dados é restrito e monitorado.
            </p>
            
            <h2>4. Compartilhamento de Informações</h2>
            <p>
             Nós não compartilhamos suas informações de identificação pessoal com terceiros, exceto em casos de obrigação legal ou ordem judicial. Seus dados financeiros são processados de forma anônima pela nossa IA e não são compartilhados.
            </p>

            <h2>5. Seus Direitos como Titular dos Dados (LGPD)</h2>
            <p>
              Você, como titular dos dados, possui total controle sobre suas informações. A qualquer momento, você pode solicitar:
              <ul>
                  <li>Acesso aos seus dados;</li>
                  <li>Correção de informações incompletas, inexatas ou desatualizadas;</li>
                  <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em não conformidade com a LGPD;</li>
                  <li>Portabilidade dos seus dados a outro fornecedor de serviço;</li>
                  <li>Eliminação dos dados pessoais tratados com o seu consentimento.</li>
              </ul>
              Para exercer seus direitos, por favor, entre em contato conosco.
            </p>

            <h2>6. Contato</h2>
            <p>
              Se restou alguma dúvida sobre nossa Política de Privacidade ou sobre como gerenciamos seus dados, entre em contato conosco pelo e-mail: <a href="mailto:sistemaoraculoia@gmail.com">sistemaoraculoia@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
      <footer className="w-full py-8 bg-white border-t">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="font-semibold">&copy; {new Date().getFullYear()} Oráculo Financeiro IA</p>
                <p className="mt-1">Feito com muito ☕ e 🤖 por Victão</p>
            </div>
            <div className="text-center md:text-right">
                <Link href="/privacy" className="font-semibold text-blue-700 hover:underline">
                    Política de Privacidade (LGPD)
                </Link>
                <p className="mt-1">
                    Contato:
                </p>
            </div>
          </div>
      </footer>
    </div>
  );
}
