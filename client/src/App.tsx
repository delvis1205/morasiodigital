import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";
import OrderTracking from "./pages/OrderTracking";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminProducts from "./pages/AdminProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminAdmins from "./pages/AdminAdmins";
import AdminApiSettings from "./pages/AdminApiSettings";
import AdminBanners from "./pages/AdminBanners";
import AdminCategories from "./pages/AdminCategories";
import AdminBlog from "./pages/AdminBlog";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import AIChatAssistant from "./components/AIChatAssistant";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/produtos"} component={Products} />
      <Route path={"/produto/:slug"} component={ProductDetail} />
      <Route path={"/carrinho"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/admin/pedidos"} component={AdminOrders} />
      <Route path={"/admin/produtos"} component={AdminProducts} />
      <Route path={"/admin/admins"} component={AdminAdmins} />
      <Route path={"/admin/api-settings"} component={AdminApiSettings} />
      <Route path={"/admin/banners"} component={AdminBanners} />
      <Route path={"/admin/categorias"} component={AdminCategories} />
      <Route path={"/admin/blog"} component={AdminBlog} />
      <Route path={"/pedido/:orderNumber"} component={OrderTracking} />
      <Route path={"/acompanhar-pedido"} component={OrderTracking} />
      <Route path={"/acompanhar"} component={OrderTracking} />
      <Route path={"/contato"} component={Contact} />
      <Route path={"/sobre"} component={About} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/perfil"} component={Profile} />
      <Route path={"/privacidade"} component={Privacy} />
      <Route path={"/termos"} component={Terms} />
      <Route path={"/suporte"} component={Support} />
      <Route path={"/blog"} component={BlogList} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/404"} component={NotFound} />      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <AIChatAssistant />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
