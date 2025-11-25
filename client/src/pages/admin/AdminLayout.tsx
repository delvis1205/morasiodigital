import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { LayoutDashboard, Package, ShoppingCart, LogOut, Home, Settings, Menu, X, Image, Grid, FileText } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoutMutation = trpc.auth.logout.useMutation();

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-4">
            Você não tem permissão para acessar esta área.
          </p>
          <Link href="/">
            <Button>Voltar para Início</Button>
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
    { href: "/admin/produtos", label: "Produtos", icon: Package },
    { href: "/admin/categorias", label: "Categorias", icon: Grid },
    { href: "/admin/banners", label: "Banners", icon: Image },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/admins", label: "Gerenciar Admins", icon: Settings },
    { href: "/admin/api-settings", label: "Configurações de APIs", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={APP_LOGO} alt={APP_TITLE} className="h-6 w-auto" />
          <span className="font-bold text-sm">{APP_TITLE}</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-blue-700 rounded transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-auto w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Desktop Header */}
        <div className="hidden md:block p-6 border-b">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-auto" />
              <span className="font-bold text-sm">{APP_TITLE}</span>
            </div>
          </Link>
          <p className="text-xs text-muted-foreground mt-2">Painel Admin</p>
        </div>

        {/* Mobile Header in Sidebar */}
        <div className="md:hidden p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-6 w-auto" />
            <span className="font-bold text-sm">{APP_TITLE}</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 text-left"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t space-y-2">
          <p className="text-xs font-medium text-muted-foreground px-2 mb-2 truncate">
            {user.firstName} {user.lastName}
          </p>
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => setSidebarOpen(false)}
            >
              <Home className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Voltar ao Site</span>
            </Button>
          </Link>
          <Button
            variant="destructive"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{logoutMutation.isPending ? "Saindo..." : "Sair"}</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
