import { useState } from "react";
import { trpc } from "@/_core/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Edit, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function Categories() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    isActive: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const { data: categories, isLoading, refetch } = trpc.admin.categories.list.useQuery();
  const createCategory = trpc.admin.categories.create.useMutation();
  const updateCategory = trpc.admin.categories.update.useMutation();
  const uploadImage = trpc.admin.products.uploadImage.useMutation();

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(",")[1];

        const result = await uploadImage.mutateAsync({
          fileData: base64Data,
          fileName: file.name,
          mimeType: file.type,
        });

        setFormData({ ...formData, imageUrl: result.url });
        toast.success("Imagem carregada com sucesso!");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Erro ao carregar imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.slug) {
      toast.error("Nome e slug são obrigatórios");
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          data: formData,
        });
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await createCategory.mutateAsync(formData);
        toast.success("Categoria criada com sucesso!");
      }
      
      refetch();
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar categoria");
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      imageUrl: category.imageUrl || "",
      isActive: category.isActive,
    });
    setImagePreview(category.imageUrl || "");
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
      isActive: 1,
    });
    setImageFile(null);
    setImagePreview("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Categorias</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({ 
                      ...formData, 
                      name,
                      slug: generateSlug(name)
                    });
                  }}
                  placeholder="Ex: Free Fire"
                />
              </div>

              <div>
                <Label>Slug *</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Ex: free-fire"
                />
              </div>

              <div>
                <Label>Descrição (opcional)</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da categoria"
                />
              </div>

              <div>
                <Label>Imagem (opcional)</Label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                  />
                  {imagePreview && (
                    <div className="relative w-32 h-32 border rounded overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {uploading && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Carregando imagem...
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isActive === 1}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked ? 1 : 0 })
                  }
                />
                <Label>Categoria Ativa</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={uploading}>
                  {editingCategory ? "Atualizar" : "Criar"} Categoria
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories && categories.length > 0 ? (
          categories.map((category: any) => (
            <Card key={category.id} className="p-4">
              <div className="space-y-3">
                {category.imageUrl && (
                  <div className="w-full h-32 bg-muted rounded overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">Slug: {category.slug}</p>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-2">{category.description}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    Status: {category.isActive ? "Ativa" : "Inativa"}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(category)}
                  className="w-full"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center text-muted-foreground col-span-full">
            Nenhuma categoria cadastrada
          </Card>
        )}
      </div>
    </div>
  );
}
