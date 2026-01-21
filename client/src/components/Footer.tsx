import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

/**
 * Footer Component
 * Design: Minimalist Corporate Futuristic
 * - Company info, quick links, contact details
 * - Responsive grid layout
 * - Social media links
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">M</span>
              </div>
              <h3 className="text-lg font-bold">Morário Digital</h3>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Soluções digitais, plataformas online e serviços inteligentes em um único ecossistema.
            </p>
            <p className="text-xs text-white/50">NIF: 5002678500</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Plataformas</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://recargas.morasio.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  MD Recargas
                </a>
              </li>
              <li>
                <a
                  href="https://loja.morasio.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Morásio Shop
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Serviços Digitais
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70">Criação de Sites</li>
              <li className="text-white/70">Plataformas Web</li>
              <li className="text-white/70">Automação Digital</li>
              <li className="text-white/70">Consultoria Tech</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Contactos</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-white/70">+244 973 929 712</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-white/70">+244 973 929 713</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a
                  href="mailto:morasiodigital@gmail.com"
                  className="text-white/70 hover:text-accent transition-colors"
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
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent transition-colors flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent transition-colors flex items-center justify-center"
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
