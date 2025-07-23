import { Header } from '@/components/landing-page/header';

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
              A sua privacidade é importante para nós. É política do Oráculo Financeiro respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no nosso site.
            </p>
            
            <h2>1. Coleta de Dados</h2>
            <p>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>
            <p>
              Para o funcionamento da plataforma, coletamos os seguintes dados durante o cadastro:
              <ul>
                <li><strong>Nome e Endereço de e-mail:</strong> Para identificação e comunicação.</li>
                <li><strong>Dados Financeiros:</strong> As informações sobre receitas, despesas e metas que você cadastra são utilizadas exclusivamente para a funcionalidade do aplicativo, como a geração de gráficos e insights pela IA.</li>
              </ul>
            </p>

            <h2>2. Uso de Dados</h2>
            <p>
              Os dados fornecidos são utilizados para:
              <ul>
                <li>Operar e manter a plataforma;</li>
                <li>Personalizar sua experiência e apresentar insights financeiros;</li>
                <li>Comunicar com você, incluindo suporte ao cliente e notificações sobre sua conta;</li>
                <li>Cumprir com as nossas obrigações legais, incluindo a Lei Geral de Proteção de Dados (LGPD).</li>
              </ul>
            </p>
            
            <h2>3. Segurança</h2>
            <p>
              Retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </p>
            
            <h2>4. Compartilhamento de Dados</h2>
            <p>
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </p>

            <h2>5. Seus Direitos (LGPD)</h2>
            <p>
              Como titular dos dados, você tem o direito de solicitar o acesso, correção, anonimização, bloqueio ou eliminação dos seus dados pessoais. Para exercer seus direitos, entre em contato conosco.
            </p>

            <h2>6. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco pelo e-mail: <a href="mailto:sistemaoraculoia@gmail.com">sistemaoraculoia@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
