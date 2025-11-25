import { useParams, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/const";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, ShoppingCart, Star, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  
  const { data: product, isLoading } = trpc.products.getBySlug.useQuery(slug || "");
  const { data: category } = trpc.categories.list.useQuery();

  const handleAddToCart = () => {
    if (!product) return;
    
    const categoryName = category?.find(c => c.id === product.categoryId)?.name || "Jogo";
    
    addItem({
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.imageUrl || undefined,
      gameName: categoryName,
    });
    
    toast.success("Produto adicionado ao carrinho!", {
      description: product.name,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setLocation("/carrinho");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="h-96 w-full" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Button onClick={() => setLocation("/produtos")}>
              Voltar para Produtos
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <Button
            variant="ghost"
            className="mb-8 gap-2"
            onClick={() => setLocation("/produtos")}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Produtos
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <Card>
                <CardContent className="p-0">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Sem imagem</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {product.isFeatured === 1 && (
                  <Badge className="mb-2 bg-accent text-accent-foreground">
                    Em Destaque
                  </Badge>
                )}
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                
                {product.bonus && (
                  <Badge variant="secondary" className="mb-4">
                    <Star className="h-4 w-4 mr-1" />
                    {product.bonus}
                  </Badge>
                )}

                <div className="flex items-baseline gap-4 mb-6">
                  <p className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <p className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                </div>
              </div>

              {product.shortDescription && (
                <p className="text-lg text-muted-foreground">
                  {product.shortDescription}
                </p>
              )}

              {product.description && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">Descrição</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Métodos de Pagamento Aceitos</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Express
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      PayPay AO
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Unitel Money
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Transferência Bancária (IBAN)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Pagamento Presencial
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleBuyNow}
                >
                  Comprar Agora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Adicionar ao Carrinho
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Entrega instantânea após confirmação do pagamento
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <ProductReviews productId={product.id} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
