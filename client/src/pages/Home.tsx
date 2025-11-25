import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerCarousel from "@/components/BannerCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/const";
import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Clock, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: products, isLoading } = trpc.products.list.useQuery({ isFeatured: 1 });
  const { data: categories } = trpc.categories.list.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Banner Carousel */}
        <section className="container py-8">
          <BannerCarousel />
        </section>

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
          <div className="container">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <Zap className="h-3 w-3 mr-1" />
                Promoção Relâmpago
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Recarga de Jogos Rápida e Segura
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                Free Fire, Delta Force, Black Clover e muito mais. Entrega instantânea!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/produtos">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Fazer Recarga Agora
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/sobre">
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Entrega Instantânea</h3>
                <p className="text-muted-foreground">
                  Receba seus diamantes ou moedas em minutos após a confirmação do pagamento
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">100% Seguro</h3>
                <p className="text-muted-foreground">
                  Transações protegidas e dados criptografados para sua segurança
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Suporte 24/7</h3>
                <p className="text-muted-foreground">
                  Atendimento via WhatsApp disponível a qualquer hora
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <section className="py-16">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Categorias Populares</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Link key={category.id} href={`/produtos?categoria=${category.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        {category.imageUrl && (
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="h-20 w-20 object-contain mb-4"
                          />
                        )}
                        <h3 className="font-semibold">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Produtos em Destaque</h2>
              <Link href="/produtos">
                <Button variant="ghost" className="gap-2">
                  Ver Todos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-40 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product) => (
                  <Link key={product.id} href={`/produto/${product.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                      <CardHeader className="p-0">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                      </CardHeader>
                      <CardContent className="flex-1 p-4">
                        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                        {product.bonus && (
                          <Badge variant="secondary" className="mb-2">
                            <Star className="h-3 w-3 mr-1" />
                            {product.bonus}
                          </Badge>
                        )}
                        <CardDescription className="line-clamp-2">
                          {product.shortDescription}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                          <p className="text-xl font-bold text-primary">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <Button size="sm">Comprar</Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">
                Nenhum produto em destaque no momento.
              </p>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Escolha seu jogo favorito e faça sua recarga agora mesmo!
            </p>
            <Link href="/produtos">
              <Button size="lg" variant="secondary" className="gap-2">
                Ver Todos os Produtos
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
