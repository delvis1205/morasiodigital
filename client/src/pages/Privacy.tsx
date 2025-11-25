import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Política de Privacidade</h1>
            
            <div className="space-y-6 sm:space-y-8 text-foreground text-sm sm:text-base">
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">1. Introdução</h2>
                <p className="leading-relaxed">
                  A Morásio Digital ("nós", "nosso" ou "nos") opera o site www.morasiodigital.com (o "Site"). 
                  Esta página informa você sobre nossas políticas de coleta, uso e divulgação de dados pessoais 
                  quando você usa nosso Site e as escolhas que você tem associadas a esses dados.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">2. Informações que Coletamos</h2>
                <p className="mb-3 leading-relaxed">Coletamos vários tipos de informações em conexão com os serviços que oferecemos, incluindo:</p>
                <ul className="space-y-2 ml-4 sm:ml-6">
                  <li><strong>Informações de Conta:</strong> Nome, email, telefone, endereço de entrega</li>
                  <li><strong>Informações de Jogo:</strong> ID do jogo, nickname, tipo de jogo</li>
                  <li><strong>Informações de Pedido:</strong> Histórico de compras, métodos de pagamento, comprovantes</li>
                  <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, páginas visitadas</li>
                  <li><strong>Cookies:</strong> Usamos cookies para manter sua sessão e preferências</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">3. Como Usamos Suas Informações</h2>
                <p className="mb-3 leading-relaxed">Usamos as informações coletadas para:</p>
                <ul className="space-y-2 ml-4 sm:ml-6">
                  <li>Processar e entregar seus pedidos</li>
                  <li>Enviar notificações sobre o status de seus pedidos</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Comunicar-nos com você sobre promoções e atualizações</li>
                  <li>Prevenir fraude e garantir a segurança do Site</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">4. Compartilhamento de Informações</h2>
                <p className="mb-3 leading-relaxed">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
                </p>
                <ul className="space-y-2 ml-4 sm:ml-6">
                  <li>Com prestadores de serviço que nos ajudam a operar o Site</li>
                  <li>Quando exigido por lei ou para proteger nossos direitos</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">5. Segurança de Dados</h2>
                <p className="leading-relaxed">
                  Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra 
                  acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão 
                  pela Internet é 100% seguro.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">6. Seus Direitos</h2>
                <p className="mb-3 leading-relaxed">Você tem o direito de:</p>
                <ul className="space-y-2 ml-4 sm:ml-6">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir informações imprecisas</li>
                  <li>Solicitar a exclusão de suas informações</li>
                  <li>Optar por não receber comunicações de marketing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">7. Retenção de Dados</h2>
                <p className="leading-relaxed">
                  Retemos suas informações pessoais pelo tempo necessário para fornecer nossos serviços e cumprir 
                  nossas obrigações legais. Você pode solicitar a exclusão de seus dados a qualquer momento.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">8. Contato</h2>
                <p className="mb-3 leading-relaxed">
                  Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em:
                </p>
                <ul className="space-y-2 ml-4 sm:ml-6">
                  <li>Email: morasiodigital@gmail.com</li>
                  <li>WhatsApp: +244 923 929 712</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">9. Alterações a Esta Política</h2>
                <p className="leading-relaxed">
                  Podemos atualizar esta Política de Privacidade de tempos em tempos. Notificaremos você sobre 
                  alterações significativas publicando a nova política em nosso Site.
                </p>
              </section>

              <section className="border-t pt-6 sm:pt-8">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
