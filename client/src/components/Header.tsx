import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Header Component
 * Design: Minimalist Corporate Futuristic
 * - Clean navigation with responsive mobile menu
 * - Logo on left, nav links on right
 * - CTA button for WhatsApp contact
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-bold text-primary">Morário Digital</h1>
            <p className="text-xs text-muted-foreground">Tecnologia que conecta</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-foreground hover:text-accent transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://wa.me/244973929712', '_blank')}
            className="border-accent text-accent hover:bg-accent hover:text-white"
          >
            WhatsApp
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-border">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-left text-foreground hover:text-accent transition-colors py-2 font-medium"
              >
                {link.label}
              </button>
            ))}
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-white mt-2"
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
