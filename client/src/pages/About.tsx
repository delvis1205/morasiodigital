import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, HeadphonesIcon, Award } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Zap,
      title: "Entrega Instantânea",
      description: "Receba seus diamantes ou moedas em minutos após a confirmação do pagamento.",
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Transações protegidas e dados criptografados para sua segurança.",
    },
    {
      icon: HeadphonesIcon,
      title: "Suporte 24/7",
      description: "Atendimento via WhatsApp disponível a qualquer hora do dia.",
    },
    {
      icon: Award,
      title: "Melhor Preço",
      description: "Preços competitivos e promoções exclusivas para nossos clientes.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a Morásio Digital
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              A melhor plataforma de recarga de jogos em Angola. Rápido, seguro e confiável.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
              <p className="text-lg text-muted-foreground">
                Proporcionar a melhor experiência de recarga de jogos para gamers angolanos, 
                com rapidez, segurança e atendimento excepcional.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A <strong>Morásio Digital</strong> nasceu da paixão por jogos e da necessidade 
                  de oferecer um serviço de recarga confiável e eficiente em Angola. Sabemos o 
                  quanto é importante ter acesso rápido aos recursos do seu jogo favorito, e é 
                  por isso que trabalhamos incansavelmente para garantir que cada transação seja 
                  processada com velocidade e segurança.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nossa equipe está sempre disponível para ajudar, seja através do WhatsApp, 
                  e-mail ou telefone. Acreditamos que um bom atendimento faz toda a diferença, 
                  e estamos comprometidos em superar suas expectativas.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Com uma ampla variedade de jogos suportados e métodos de pagamento flexíveis, 
                  tornamos a recarga de jogos acessível para todos. Junte-se a milhares de 
                  jogadores satisfeitos que confiam na Morásio Digital para suas recargas.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Por Que Escolher a Morásio Digital?</h2>
              <p className="text-lg text-muted-foreground">
                Oferecemos o melhor serviço de recarga de jogos em Angola
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">1000+</p>
                <p className="text-muted-foreground">Clientes Satisfeitos</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">10+</p>
                <p className="text-muted-foreground">Jogos Suportados</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">24/7</p>
                <p className="text-muted-foreground">Suporte Disponível</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
