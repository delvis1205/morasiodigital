import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Zap,
  Shield,
  Rocket,
  Code,
  Smartphone,
  Cpu,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Lightbulb,
} from 'lucide-react';

/**
 * Home Page - Morário Digital
 * Design: Minimalist Corporate Futuristic
 * Sections:
 * 1. Hero Section
 * 2. About Section
 * 3. Platforms Section
 * 4. Services Section
 * 5. Mission/Vision/Values Section
 * 6. CEO Section
 * 7. Contact Section
 */

export default function Home() {
  const services = [
    {
      icon: Code,
      title: 'Criação de Sites Profissionais',
      description: 'Websites modernos, responsivos e otimizados para conversão',
    },
    {
      icon: Smartphone,
      title: 'Plataformas Web Personalizadas',
      description: 'Soluções sob medida para seus negócios digitais',
    },
    {
      icon: Zap,
      title: 'Automação de Processos',
      description: 'WhatsApp, IA, formulários e workflows inteligentes',
    },
    {
      icon: Cpu,
      title: 'Integrações com Pagamentos',
      description: 'APIs, gateways de pagamento e sistemas integrados',
    },
    {
      icon: Lightbulb,
      title: 'Consultoria Digital',
      description: 'Estratégia e transformação digital para sua empresa',
    },
    {
      icon: Rocket,
      title: 'Projetos Tecnológicos',
      description: 'Soluções inovadoras e sob medida para desafios complexos',
    },
  ];

  const values = [
    { icon: Zap, label: 'Inovação', description: 'Sempre buscando novas soluções' },
    { icon: Shield, label: 'Transparência', description: 'Comunicação clara e honesta' },
    { icon: CheckCircle, label: 'Qualidade', description: 'Excelência em cada projeto' },
    { icon: Target, label: 'Compromisso', description: 'Dedicados ao seu sucesso' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt="Hero background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Morário Digital
                </h1>
                <p className="text-xl md:text-2xl text-accent font-semibold">
                  Tecnologia que conecta soluções
                </p>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-lg">
                Soluções digitais, plataformas online e serviços inteligentes em um único ecossistema. Transformamos ideias em realidade tecnológica.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white"
                  onClick={() => window.open('https://recargas.morasio.shop', '_blank')}
                >
                  Recargas de Jogos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => window.open('https://loja.morasio.shop', '_blank')}
                >
                  Loja Online
                </Button>
                <Button
                  size="lg"
                  className="bg-success hover:bg-success/90 text-white"
                  onClick={() => window.open('https://wa.me/244973929712', '_blank')}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <img
                src="/images/platforms-hero.png"
                alt="Platforms illustration"
                className="w-full max-w-md drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Sobre a Morário Digital
              </h2>
              <p className="text-lg text-foreground/70">
                Conheça nossa história e compromisso com a inovação
              </p>
            </div>

            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg">
                A <span className="font-semibold text-primary">Morário Digital</span> é uma empresa focada em inovação digital, criação de plataformas online, venda de produtos diversos, automações, serviços tecnológicos e soluções práticas para pessoas, itens gamers e negócios gerais.
              </p>
              <p className="text-lg">
                Somos a empresa mãe de vários projetos digitais, centralizando soluções de tecnologia que conectam pessoas, negócios e oportunidades. Com atuação em Angola e visão internacional, trabalhamos para posicionar-nos como referência em soluções digitais.
              </p>
              <p className="text-lg">
                Nosso compromisso é com a <span className="font-semibold text-primary">inovação contínua</span>, <span className="font-semibold text-primary">qualidade</span> em cada projeto e <span className="font-semibold text-primary">confiança</span> nas relações com clientes e parceiros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Nossas Plataformas
            </h2>
            <p className="text-lg text-foreground/70">
              Ecossistema completo de soluções digitais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* MD Recargas */}
            <Card className="p-8 border-l-4 border-l-accent hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary">MD Recargas</h3>
                <p className="text-foreground/70">
                  Plataforma especializada em recargas de jogos online
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Rápido e seguro
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Suporte via WhatsApp
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Pagamentos locais e acessíveis
                  </li>
                </ul>
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-white mt-4"
                  onClick={() => window.open('https://recargas.morasio.shop', '_blank')}
                >
                  Acessar Plataforma
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Morásio Shop */}
            <Card className="p-8 border-l-4 border-l-success hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Morásio Shop</h3>
                <p className="text-foreground/70">
                  Loja online de produtos diversos
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Ambiente moderno e seguro
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Facilidade de compra
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Produtos selecionados
                  </li>
                </ul>
                <Button
                  className="w-full bg-success hover:bg-success/90 text-white mt-4"
                  onClick={() => window.open('https://loja.morasio.shop', '_blank')}
                >
                  Visitar Loja
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Serviços Digitais
            </h2>
            <p className="text-lg text-foreground/70">
              Soluções completas para transformação digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg hover:border-accent transition-all group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 text-accent group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary">
                      {service.title}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {service.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Missão, Visão e Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Missão */}
            <Card className="p-8 border-t-4 border-t-accent">
              <h3 className="text-xl font-bold text-primary mb-4">Missão</h3>
              <p className="text-foreground/70 leading-relaxed">
                Facilitar o acesso à tecnologia e aos serviços digitais através de soluções modernas, práticas e seguras.
              </p>
            </Card>

            {/* Visão */}
            <Card className="p-8 border-t-4 border-t-success">
              <h3 className="text-xl font-bold text-primary mb-4">Visão</h3>
              <p className="text-foreground/70 leading-relaxed">
                Ser referência em soluções digitais e plataformas online em Angola e além, transformando a forma como as pessoas e negócios interagem com tecnologia.
              </p>
            </Card>

            {/* Valores */}
            <Card className="p-8 border-t-4 border-t-primary">
              <h3 className="text-xl font-bold text-primary mb-4">Valores</h3>
              <div className="space-y-2 text-sm text-foreground/70">
                <p>• <span className="font-semibold">Inovação</span></p>
                <p>• <span className="font-semibold">Transparência</span></p>
                <p>• <span className="font-semibold">Qualidade</span></p>
                <p>• <span className="font-semibold">Compromisso</span></p>
                <p>• <span className="font-semibold">Evolução contínua</span></p>
              </div>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-secondary/50 hover:bg-accent/10 transition-colors"
                >
                  <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-primary text-sm mb-1">
                    {value.label}
                  </h4>
                  <p className="text-xs text-foreground/60">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Liderança
              </h2>
            </div>

            <Card className="p-8 md:p-12 text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Delvis de Morais
                </h3>
                <p className="text-accent font-semibold mb-4">
                  CEO & Fundador
                </p>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Empreendedor digital apaixonado por inovação e transformação tecnológica. Fundador da Morário Digital, dedicado a criar soluções que conectam pessoas e negócios através da tecnologia.
                </p>
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-white"
                  onClick={() =>
                    window.open(
                      'https://www.linkedin.com/in/delvisdemorais/',
                      '_blank'
                    )
                  }
                >
                  Ver LinkedIn
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Contactos
              </h2>
              <p className="text-lg text-foreground/70">
                Estamos prontos para ajudar com suas necessidades digitais
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Telefones */}
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent" />
                  Telefone / WhatsApp
                </h3>
                <div className="space-y-2">
                  <a
                    href="tel:+244973929712"
                    className="block text-foreground/70 hover:text-accent transition-colors font-medium"
                  >
                    +244 973 929 712
                  </a>
                  <a
                    href="tel:+244973929713"
                    className="block text-foreground/70 hover:text-accent transition-colors font-medium"
                  >
                    +244 973 929 713
                  </a>
                </div>
              </Card>

              {/* E-mails */}
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent" />
                  E-mail
                </h3>
                <div className="space-y-2">
                  <a
                    href="mailto:morasiodigital@gmail.com"
                    className="block text-foreground/70 hover:text-accent transition-colors font-medium"
                  >
                    morasiodigital@gmail.com
                  </a>
                  <a
                    href="mailto:email.morasio@gmail.com"
                    className="block text-foreground/70 hover:text-accent transition-colors font-medium"
                  >
                    email.morasio@gmail.com
                  </a>
                </div>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-success hover:bg-success/90 text-white"
                onClick={() => window.open('https://wa.me/244973929712', '_blank')}
              >
                Falar no WhatsApp
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() =>
                  window.location.href = 'mailto:morasiodigital@gmail.com'
                }
              >
                Enviar E-mail
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Import icons that were used
import { Phone, Mail } from 'lucide-react';
