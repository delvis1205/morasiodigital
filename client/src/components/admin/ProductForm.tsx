import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";

interface ProductFormProps {
  product?: any;
  categories: any[];
  onSuccess: () => void;
}

export default function ProductForm({ product, categories, onSuccess }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null);
  const [formData, setFormData] = useState({
    categoryId: product?.categoryId || "",
    name: product?.name || "",
    slug: product?.slug || "",
    shortDescription: product?.shortDescription || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    price: product?.price ? (product.price / 100).toString() : "",
    originalPrice: product?.originalPrice ? (product.originalPrice / 100).toString() : "",
    bonus: product?.bonus || "",
    isActive: product?.isActive === 1,
    isFeatured: product?.isFeatured === 1,
  });

  const createMutation = trpc.admin.products.create.useMutation();
  const updateMutation = trpc.admin.products.update.useMutation();
  const uploadMutation = trpc.admin.products.uploadImage.useMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo 5MB.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem válida.");
      return;
    }

    setIsUploading(true);
    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const base64Data = base64.split(",")[1];

        try {
          const result = await uploadMutation.mutateAsync({
            fileData: base64Data,
            fileName: file.name,
            mimeType: file.type,
          });

          setFormData({ ...formData, imageUrl: result.url });
          setImagePreview(result.url);
          toast.success("Imagem enviada com sucesso!");
        } catch (error) {
          toast.error("Erro ao fazer upload da imagem");
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Erro ao processar imagem");
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageUrl: "" });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        categoryId: Number(formData.categoryId),
        name: formData.name,
        slug: formData.slug,
        shortDescription: formData.shortDescription || undefined,
        description: formData.description || undefined,
        imageUrl: formData.imageUrl || undefined,
        price: Math.round(Number(formData.price) * 100),
        originalPrice: formData.originalPrice ? Math.round(Number(formData.originalPrice) * 100) : undefined,
        bonus: formData.bonus || undefined,
        isActive: formData.isActive ? 1 : 0,
        isFeatured: formData.isFeatured ? 1 : 0,
      };

      if (product) {
        await updateMutation.mutateAsync({
          id: product.id,
          data,
        });
        toast.success("Produto atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Produto criado com sucesso!");
      }

      onSuccess();
    } catch (error) {
      toast.error(product ? "Erro ao atualizar produto" : "Erro ao criar produto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: !product ? generateSlug(name) : formData.slug,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Categoria */}
      <div>
        <Label htmlFor="categoryId">Categoria *</Label>
        <Select
          value={formData.categoryId.toString()}
          onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Nome */}
      <div>
        <Label htmlFor="name">Nome do Produto *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Ex: 100 Diamantes"
        />
      </div>

      {/* Slug */}
      <div>
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          required
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="Ex: 100-diamantes"
        />
      </div>

      {/* Descrição Curta */}
      <div>
        <Label htmlFor="shortDescription">Descrição Curta</Label>
        <Input
          id="shortDescription"
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          placeholder="Ex: 100 Diamantes + Bônus"
        />
      </div>

      {/* Descrição Completa */}
      <div>
        <Label htmlFor="description">Descrição Completa</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição detalhada do produto..."
          rows={4}
        />
      </div>

      {/* Upload de Imagem */}
      <div className="space-y-3">
        <Label>Imagem do Produto</Label>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative w-full h-48 rounded-lg border border-border overflow-hidden bg-muted">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Upload Input */}
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="hidden"
            id="imageInput"
          />
          <label htmlFor="imageInput" className="cursor-pointer block">
            {isUploading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Enviando...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="font-medium">Clique para selecionar uma imagem</span>
                <span className="text-xs text-muted-foreground">PNG, JPG, GIF até 5MB</span>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Preço */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Preço (Kz) *</Label>
          <Input
            id="price"
            type="number"
            required
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0.00"
          />
        </div>
        <div>
          <Label htmlFor="originalPrice">Preço Original (Kz)</Label>
          <Input
            id="originalPrice"
            type="number"
            step="0.01"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Bônus */}
      <div>
        <Label htmlFor="bonus">Bônus</Label>
        <Input
          id="bonus"
          value={formData.bonus}
          onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
          placeholder="Ex: +10 Diamantes Bônus"
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isActive: checked as boolean })
            }
          />
          <Label htmlFor="isActive" className="font-normal cursor-pointer">
            Produto Ativo
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isFeatured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isFeatured: checked as boolean })
            }
          />
          <Label htmlFor="isFeatured" className="font-normal cursor-pointer">
            Produto em Destaque
          </Label>
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="flex-1"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? "Atualizar Produto" : "Criar Produto"}
        </Button>
      </div>
    </form>
  );
}
