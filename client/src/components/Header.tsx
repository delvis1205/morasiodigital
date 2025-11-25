import { APP_LOGO, APP_TITLE, CONTACT_PHONE } from "@/const";
import { Button } from "@/components/ui/button";
import { Menu, Phone, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, loading } = useAuth();
  const { totalItems } = useCart();
  const logoutMutation = trpc.auth.logout.useMutation();
  const utils = trpc.useUtils();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      await utils.auth.me.invalidate();
      toast.success("Desconectado com sucesso!");
      setLocation("/");
    } catch (error) {
      toast.error("Erro ao desconectar");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-auto" />
            <span className="hidden font-bold text-lg sm:inline-block">{APP_TITLE}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/produtos" className="text-sm font-medium hover:text-primary transition-colors">
              Produtos
            </Link>
            <Link href="/acompanhar-pedido" className="text-sm font-medium hover:text-primary transition-colors">
              Acompanhar Pedido
            </Link>
            <Link href="/contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </Link>
            <Link href="/sobre" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link href="/suporte" className="text-sm font-medium hover:text-primary transition-colors">
              Suporte
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a href={`tel:${CONTACT_PHONE}`} className="hidden sm:flex">
              <Button variant="ghost" size="sm" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">{CONTACT_PHONE}</span>
              </Button>
            </a>
            
            <Link href="/carrinho">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {!loading && isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">
                      Bem-vindo, {user.firstName || user.name || "Usuário"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {user.role === "admin" ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Painel Admin</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/perfil">Minha Conta</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">
                  Entrar
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              {isAuthenticated && user && (
                <>
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">Bem-vindo, {user.firstName || user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  {user.role === "admin" ? (
                    <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                      Painel Admin
                    </Link>
                  ) : (
                    <Link href="/perfil" className="text-sm font-medium hover:text-primary transition-colors">
                      Minha Conta
                    </Link>
                  )}
                </>
              )}
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Início
              </Link>
              <Link href="/produtos" className="text-sm font-medium hover:text-primary transition-colors">
                Produtos
              </Link>
              <Link href="/acompanhar-pedido" className="text-sm font-medium hover:text-primary transition-colors">
                Acompanhar Pedido
              </Link>
              <Link href="/contato" className="text-sm font-medium hover:text-primary transition-colors">
                Contato
              </Link>
              <Link href="/sobre" className="text-sm font-medium hover:text-primary transition-colors">
                Sobre
              </Link>
              <Link href="/suporte" className="text-sm font-medium hover:text-primary transition-colors">
                Suporte
              </Link>
              {isAuthenticated && (
                <>
                  <div className="border-t pt-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
