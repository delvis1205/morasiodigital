import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
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
  Sparkles,
} from 'lucide-react';

/**
 * Home Page - Morário Digital Premium
 * Design: Premium Tech Gradient with Sophisticated Animations
 * Sections with scroll-triggered animations and gradient effects
 */

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useIntersectionAnimation();
  return (
    <div ref={ref} className={`fade-in-on-scroll ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const services = [
    {
      icon: Code,
      title: 'Criação de Sites Profissionais',
      description: 'Websites modernos, responsivos e otimizados para conversão',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Smartphone,
      title: 'Plataformas Web Personalizadas',
      description: 'Soluções sob medida para seus negócios digitais',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Zap,
      title: 'Automação de Processos',
      description: 'WhatsApp, IA, formulários e workflows inteligentes',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: Cpu,
      title: 'Integrações com Pagamentos',
      description: 'APIs, gateways de pagamento e sistemas integrados',
      gradient: 'from-cyan-500 to-purple-600',
    },
    {
      icon: Lightbulb,
      title: 'Consultoria Digital',
      description: 'Estratégia e transformação digital para sua empresa',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Rocket,
      title: 'Projetos Tecnológicos',
      description: 'Soluções inovadoras e sob medida para desafios complexos',
      gradient: 'from-pink-500 to-cyan-600',
    },
  ];

  const values = [
    { icon: Zap, label: 'Inovação', description: 'Sempre buscando novas soluções' },
    { icon: Shield, label: 'Transparência', description: 'Comunicação clara e honesta' },
    { icon: CheckCircle, label: 'Qualidade', description: 'Excelência em cada projeto' },
    { icon: Target, label: 'Compromisso', description: 'Dedicados ao seu sucesso' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <img
            src="/images/hero-bg.png"
            alt="Hero background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-purple-100 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-semibold text-purple-600">Tecnologia Premium</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
                    Morário Digital
                  </span>
                </h1>
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  Tecnologia que conecta soluções
                </p>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Soluções digitais premium, plataformas online inovadoras e serviços inteligentes em um único ecossistema transformador.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
                  onClick={() => window.open('https://recargas.morasio.shop', '_blank')}
                >
                  Recargas de Jogos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
                  onClick={() => window.open('https://cursos.morasio.shop', '_blank')}
                >
                  Cursos Online
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
                  onClick={() => window.open('https://wa.me/244973929712', '_blank')}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center animate-fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-30"></div>
                <img
                  src="/images/platforms-hero.png"
                  alt="Platforms illustration"
                  className="w-full max-w-md drop-shadow-2xl rounded-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
                Sobre a Morário Digital
              </h2>
              <p className="text-lg text-slate-600">
                Conheça nossa história e compromisso com a inovação
              </p>
            </div>

            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-lg">
                A <span className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Morário Digital</span> é uma empresa focada em inovação digital, criação de plataformas online, venda de produtos diversos, automações, serviços tecnológicos e soluções práticas para pessoas, itens gamers e negócios gerais.
              </p>
              <p className="text-lg">
                Somos a empresa mãe de vários projetos digitais, centralizando soluções de tecnologia que conectam pessoas, negócios e oportunidades. Com atuação em Angola e visão internacional, trabalhamos para posicionar-nos como referência em soluções digitais.
              </p>
              <p className="text-lg">
                Nosso compromisso é com a <span className="font-bold text-cyan-600">inovação contínua</span>, <span className="font-bold text-purple-600">qualidade</span> em cada projeto e <span className="font-bold text-pink-600">confiança</span> nas relações com clientes e parceiros.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="text-center space-y-3 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
              Nossas Plataformas
            </h2>
            <p className="text-lg text-slate-600">
              Ecossistema completo de soluções digitais
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-stagger">
            {/* MD Recargas */}
            <Card className="p-8 border-0 bg-gradient-to-br from-white to-cyan-50 shadow-xl hover-lift hover-glow transition-all duration-300">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  MD Recargas
                </h3>
                <p className="text-slate-600">
                  Plataforma especializada em recargas de jogos online
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Rápido e seguro
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Suporte via WhatsApp
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Pagamentos locais e acessíveis
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold mt-4 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://recargas.morasio.shop', '_blank')}
                >
                  Acessar Plataforma
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Cursos Online  */}
            <Card className="p-8 border-0 bg-gradient-to-br from-white to-purple-50 shadow-xl hover-lift hover-glow-purple transition-all duration-300">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Morásio Shop
                </h3>
                <p className="text-slate-600">
                  Cursos online Com Certificados
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Ambiente moderno e seguro
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Facilidade de acesso
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cursos de Alta Qualidade
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold mt-4 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://cursos.morasio.shop', '_blank')}
                >
                  Ver os Cursos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-white to-indigo-50">
        <div className="container">
          <AnimatedSection className="text-center space-y-3 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
              Serviços Digitais
            </h2>
            <p className="text-lg text-slate-600">
              Soluções completas para transformação digital
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="p-6 border-0 bg-white shadow-lg hover-lift hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
                  <div className="relative space-y-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600">
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
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="text-center space-y-3 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
              Missão, Visão e Valores
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-stagger">
            {/* Missão */}
            <Card className="p-8 border-0 bg-gradient-to-br from-cyan-50 to-white shadow-lg hover-lift transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Missão
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Facilitar o acesso à tecnologia e aos serviços digitais através de soluções modernas, práticas e seguras.
                </p>
              </div>
            </Card>

            {/* Visão */}
            <Card className="p-8 border-0 bg-gradient-to-br from-purple-50 to-white shadow-lg hover-lift transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Visão
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Ser referência em soluções digitais e plataformas online em Angola e além, transformando a forma como as pessoas e negócios interagem com tecnologia.
                </p>
              </div>
            </Card>

            {/* Valores */}
            <Card className="p-8 border-0 bg-gradient-to-br from-pink-50 to-white shadow-lg hover-lift transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Valores
                </h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>• <span className="font-semibold">Inovação</span></p>
                  <p>• <span className="font-semibold">Transparência</span></p>
                  <p>• <span className="font-semibold">Qualidade</span></p>
                  <p>• <span className="font-semibold">Compromisso</span></p>
                  <p>• <span className="font-semibold">Evolução contínua</span></p>
                </div>
              </div>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-stagger">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-indigo-100 hover:shadow-lg hover-lift transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    {value.label}
                  </h4>
                  <p className="text-xs text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container">
          <AnimatedSection className="max-w-2xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
                Liderança
              </h2>
            </div>

            <Card className="p-8 md:p-12 border-0 bg-gradient-to-br from-white to-purple-50 shadow-2xl text-center space-y-6 hover-lift">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-2xl opacity-30"></div>
                  <img
                    src="https://delvisfolio-ka5a62ww.manus.space/favicon.png"
                    alt="Delvis de Morais"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover relative z-10 border-4 border-white shadow-2xl"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-2">
                  Delvis de Morais
                </h3>
                <p className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  CEO & Fundador
                </p>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Empreendedor digital apaixonado por inovação e transformação tecnológica. Fundador da Morário Digital, dedicado a criar soluções que conectam pessoas e negócios através da tecnologia.
                </p>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover-lift"
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
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
                Contactos
              </h2>
              <p className="text-lg text-slate-600">
                Estamos prontos para ajudar com suas necessidades digitais
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-stagger">
              {/* Telefones */}
              <Card className="p-6 border-0 bg-gradient-to-br from-cyan-50 to-white shadow-lg hover-lift transition-all duration-300">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  Telefone / WhatsApp
                </h3>
                <div className="space-y-2">
                  <a
                    href="tel:+244973929712"
                    className="block text-slate-700 hover:text-cyan-600 transition-colors font-medium"
                  >
                    +244 973 929 712
                  </a>
                  <a
                    href="tel:+244973929713"
                    className="block text-slate-700 hover:text-cyan-600 transition-colors font-medium"
                  >
                    +244 973 929 713
                  </a>
                </div>
              </Card>

              {/* E-mails */}
              <Card className="p-6 border-0 bg-gradient-to-br from-purple-50 to-white shadow-lg hover-lift transition-all duration-300">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  E-mail
                </h3>
                <div className="space-y-2">
                  <a
                    href="mailto:morasiodigital@gmail.com"
                    className="block text-slate-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    morasiodigital@gmail.com
                  </a>
                  <a
                    href="mailto:email.morasio@gmail.com"
                    className="block text-slate-700 hover:text-purple-600 transition-colors font-medium"
                  >
                    email.morasio@gmail.com
                  </a>
                </div>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover-lift"
                onClick={() => window.open('https://wa.me/244973929712', '_blank')}
              >
                Falar no WhatsApp
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover-lift"
                onClick={() =>
                  window.location.href = 'mailto:morasiodigital@gmail.com'
                }
              >
                Enviar E-mail
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Import icons
import { Mail } from 'lucide-react';
