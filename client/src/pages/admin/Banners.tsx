import { useState } from "react";
import { trpc } from "@/_core/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function Banners() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    linkUrl: "",
    description: "",
    order: 0,
    isActive: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const { data: banners, isLoading, refetch } = trpc.admin.banners.list.useQuery();
  const createBanner = trpc.admin.banners.create.useMutation();
  const updateBanner = trpc.admin.banners.update.useMutation();
  const deleteBanner = trpc.admin.banners.delete.useMutation();
  const uploadImage = trpc.admin.banners.uploadImage.useMutation();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    // Upload imagem
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
    if (!formData.title || !formData.imageUrl) {
      toast.error("Título e imagem são obrigatórios");
      return;
    }

    try {
      if (editingBanner) {
        await updateBanner.mutateAsync({
          id: editingBanner.id,
          data: formData,
        });
        toast.success("Banner atualizado com sucesso!");
      } else {
        await createBanner.mutateAsync(formData);
        toast.success("Banner criado com sucesso!");
      }
      
      refetch();
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar banner");
    }
  };

  const handleEdit = (banner: any) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl || "",
      description: banner.description || "",
      order: banner.order,
      isActive: banner.isActive,
    });
    setImagePreview(banner.imageUrl);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return;

    try {
      await deleteBanner.mutateAsync(id);
      toast.success("Banner excluído com sucesso!");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao excluir banner");
    }
  };

  const resetForm = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      imageUrl: "",
      linkUrl: "",
      description: "",
      order: 0,
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
        <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Editar Banner" : "Novo Banner"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Título *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Promoção Free Fire"
                />
              </div>

              <div>
                <Label>Imagem do Banner *</Label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                  />
                  {imagePreview && (
                    <div className="relative w-full h-48 border rounded overflow-hidden">
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

              <div>
                <Label>Link (opcional)</Label>
                <Input
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  placeholder="Ex: /produtos?categoria=free-fire"
                />
              </div>

              <div>
                <Label>Descrição (opcional)</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição do banner"
                />
              </div>

              <div>
                <Label>Ordem</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isActive === 1}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked ? 1 : 0 })
                  }
                />
                <Label>Banner Ativo</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={uploading || !formData.imageUrl}>
                  {editingBanner ? "Atualizar" : "Criar"} Banner
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {banners && banners.length > 0 ? (
          banners.map((banner: any) => (
            <Card key={banner.id} className="p-4">
              <div className="flex gap-4">
                <div className="w-48 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                  {banner.imageUrl ? (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{banner.title}</h3>
                      {banner.description && (
                        <p className="text-sm text-muted-foreground">{banner.description}</p>
                      )}
                      {banner.linkUrl && (
                        <p className="text-sm text-blue-600 mt-1">Link: {banner.linkUrl}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">
                        Ordem: {banner.order} | Status: {banner.isActive ? "Ativo" : "Inativo"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(banner)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(banner.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center text-muted-foreground">
            Nenhum banner cadastrado
          </Card>
        )}
      </div>
    </div>
  );
}
