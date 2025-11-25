import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/const";
import { Link, useLocation } from "wouter";
import { Star, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Products() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<string>("featured");

  const { data: products, isLoading } = trpc.products.list.useQuery({
    categoryId: selectedCategory,
  });
  const { data: categories } = trpc.categories.list.useQuery();

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    
    let sorted = [...products];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        sorted.sort((a, b) => b.salesCount - a.salesCount);
        break;
      case "featured":
      default:
        sorted.sort((a, b) => b.isFeatured - a.isFeatured);
        break;
    }
    return sorted;
  }, [products, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Nossos Produtos</h1>
            <p className="text-lg text-muted-foreground">
              Escolha entre centenas de opções de recarga para seus jogos favoritos
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Filtros:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Select
                  value={selectedCategory?.toString() || "all"}
                  onValueChange={(value) => setSelectedCategory(value === "all" ? undefined : Number(value))}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Em Destaque</SelectItem>
                    <SelectItem value="popular">Mais Populares</SelectItem>
                    <SelectItem value="price-asc">Menor Preço</SelectItem>
                    <SelectItem value="price-desc">Maior Preço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-48 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : sortedProducts && sortedProducts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {sortedProducts.length} produto{sortedProducts.length !== 1 ? "s" : ""} encontrado{sortedProducts.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
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
                          {product.isFeatured === 1 && (
                            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                              Destaque
                            </Badge>
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
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
                <Button onClick={() => {
                  setSelectedCategory(undefined);
                  setSortBy("featured");
                }}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
