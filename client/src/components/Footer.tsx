import { Mail, Phone, Linkedin, Github } from 'lucide-react';

/**
 * Footer Component - Premium Design
 * - Gradient background premium
 * - Links com efeitos hover
 * - Social media icons com animações
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-950 text-white py-12 md:py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/logo.png"
                alt="Morário Digital"
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-lg font-bold">Morário Digital</h3>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Soluções digitais, plataformas online e serviços inteligentes em um único ecossistema.
            </p>
            <p className="text-xs text-white/50">NIF: 5002678500</p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold mb-4 text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
              Plataformas
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://recargas.morasio.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300"
                >
                  MD Recargas
                </a>
              </li>
              <li>
                <a
                  href="https://loja.morasio.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300"
                >
                  Morásio Shop
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300"
                >
                  Serviços Digitais
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Serviços
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70 hover:text-purple-400 transition-colors cursor-pointer">Criação de Sites</li>
              <li className="text-white/70 hover:text-purple-400 transition-colors cursor-pointer">Plataformas Web</li>
              <li className="text-white/70 hover:text-purple-400 transition-colors cursor-pointer">Automação Digital</li>
              <li className="text-white/70 hover:text-purple-400 transition-colors cursor-pointer">Consultoria Tech</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold mb-4 text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text">
              Contactos
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 group cursor-pointer">
                <Phone className="w-4 h-4 text-cyan-400 group-hover:text-pink-400 transition-colors" />
                <span className="text-white/70 group-hover:text-white transition-colors">+244 973 929 712</span>
              </li>
              <li className="flex items-center gap-2 group cursor-pointer">
                <Phone className="w-4 h-4 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                <span className="text-white/70 group-hover:text-white transition-colors">+244 973 929 713</span>
              </li>
              <li className="flex items-center gap-2 group cursor-pointer">
                <Mail className="w-4 h-4 text-pink-400 group-hover:text-purple-400 transition-colors" />
                <a
                  href="mailto:morasiodigital@gmail.com"
                  className="text-white/70 group-hover:text-white transition-colors"
                >
                  morasiodigital@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            <a
              href="https://www.linkedin.com/in/delvisdemorais/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center hover-lift hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center hover-lift hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-white/50">
            <p>© {currentYear} Morário Digital – Todos os direitos reservados</p>
            <p className="mt-2">Morásio Digital - Comércio e Serviço (SU), Lda</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
