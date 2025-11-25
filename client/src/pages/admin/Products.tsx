import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/const";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminProducts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const { data: products, isLoading, refetch } = trpc.admin.products.list.useQuery();
  const { data: categories } = trpc.admin.categories.list.useQuery();
  const deleteMutation = trpc.admin.products.delete.useMutation();
  const updateMutation = trpc.admin.products.update.useMutation();

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;

    setIsDeleting(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Produto deletado com sucesso!");
      refetch();
    } catch (error) {
      toast.error("Erro ao deletar produto");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleToggleActive = async (product: any) => {
    try {
      await updateMutation.mutateAsync({
        id: product.id,
        data: {
          isActive: product.isActive === 1 ? 0 : 1,
        },
      });
      toast.success(`Produto ${product.isActive === 1 ? "desativado" : "ativado"} com sucesso!`);
      refetch();
    } catch (error) {
      toast.error("Erro ao atualizar produto");
    }
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    refetch();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar Produtos</h1>
          <p className="text-muted-foreground">
            Adicione, edite ou remova produtos do seu catálogo
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingProduct(null)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              categories={categories || []}
              onSuccess={handleFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtos ({products?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Carregando...</p>
          ) : products && products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Produto</th>
                    <th className="text-left py-3 px-4 font-semibold">Categoria</th>
                    <th className="text-left py-3 px-4 font-semibold">Preço</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Destaque</th>
                    <th className="text-left py-3 px-4 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const category = categories?.find(c => c.id === product.categoryId);
                    return (
                      <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {product.imageUrl && (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-10 w-10 rounded object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{category?.name || "N/A"}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{formatPrice(product.price)}</p>
                            {product.originalPrice && (
                              <p className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.originalPrice)}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={product.isActive === 1 ? "default" : "secondary"}
                          >
                            {product.isActive === 1 ? "Ativo" : "Inativo"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={product.isFeatured === 1 ? "default" : "outline"}
                          >
                            {product.isFeatured === 1 ? "Sim" : "Não"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleToggleActive(product)}
                              title={product.isActive === 1 ? "Desativar" : "Ativar"}
                            >
                              {product.isActive === 1 ? (
                                <Eye className="h-4 w-4" />
                              ) : (
                                <EyeOff className="h-4 w-4" />
                              )}
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Editar Produto</DialogTitle>
                                </DialogHeader>
                                <ProductForm
                                  product={product}
                                  categories={categories || []}
                                  onSuccess={handleFormSuccess}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(product.id)}
                              disabled={isDeleting === product.id}
                            >
                              {isDeleting === product.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Nenhum produto encontrado
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
