import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Header Component - Premium Design
 * - Gradient background com efeito glow
 * - Navegação responsiva com animações
 * - Logo com efeito visual premium
 */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Sobre', href: '#about' },
    { label: 'Plataformas', href: '#platforms' },
    { label: 'Serviços', href: '#services' },
    { label: 'Contactos', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-lg">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <img
            src="/images/logo.png"
            alt="Morário Digital"
            className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Morário Digital
            </h1>
            <p className="text-xs text-purple-600 font-semibold">Tecnologia Premium</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 text-sm font-semibold relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3">
          <Button
            size="sm"
            onClick={() => window.open('https://wa.me/244973929712', '_blank')}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            WhatsApp
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-indigo-100 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-purple-600" />
          ) : (
            <Menu className="w-6 h-6 text-purple-600" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-md border-t border-indigo-100 animate-fade-in-down">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-left text-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 hover:bg-clip-text transition-all py-2 font-semibold"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {link.label}
              </button>
            ))}
            <Button
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold mt-2 shadow-lg"
              onClick={() => {
                window.open('https://wa.me/244973929712', '_blank');
                setIsMenuOpen(false);
              }}
            >
              Falar no WhatsApp
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
