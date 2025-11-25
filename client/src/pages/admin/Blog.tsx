import { useState } from "react";
import { trpc } from "@/_core/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function Blog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    category: "",
    author: "Morásio Digital",
    isPublished: 1,
  });

  const { data: posts, isLoading, refetch } = trpc.admin.blog.list.useQuery();
  const createPost = trpc.admin.blog.create.useMutation();
  const updatePost = trpc.admin.blog.update.useMutation();
  const deletePost = trpc.admin.blog.delete.useMutation();

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Título, slug e conteúdo são obrigatórios");
      return;
    }

    try {
      if (editingPost) {
        await updatePost.mutateAsync({
          id: editingPost.id,
          data: formData,
        });
        toast.success("Post atualizado com sucesso!");
      } else {
        await createPost.mutateAsync(formData);
        toast.success("Post criado com sucesso!");
      }
      
      refetch();
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar post");
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || "",
      imageUrl: post.imageUrl || "",
      category: post.category || "",
      author: post.author,
      isPublished: post.isPublished,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      await deletePost.mutateAsync(id);
      toast.success("Post excluído com sucesso!");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao excluir post");
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      imageUrl: "",
      category: "",
      author: "Morásio Digital",
      isPublished: 1,
    });
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
        <h2 className="text-2xl font-bold">Gerenciar Blog</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Editar Post" : "Novo Post"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Título *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({ 
                      ...formData, 
                      title,
                      slug: generateSlug(title)
                    });
                  }}
                  placeholder="Ex: Como comprar diamantes no Free Fire"
                />
              </div>

              <div>
                <Label>Slug *</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Ex: como-comprar-diamantes-free-fire"
                />
              </div>

              <div>
                <Label>Resumo (opcional)</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Resumo curto do post"
                  rows={2}
                />
              </div>

              <div>
                <Label>Conteúdo *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Conteúdo completo do post (suporta HTML)"
                  rows={12}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>URL da Imagem (opcional)</Label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <Label>Categoria (opcional)</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ex: Guias, Notícias"
                  />
                </div>
              </div>

              <div>
                <Label>Autor</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Morásio Digital"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isPublished === 1}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isPublished: checked ? 1 : 0 })
                  }
                />
                <Label>Post Publicado</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit}>
                  {editingPost ? "Atualizar" : "Criar"} Post
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
        {posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <Card key={post.id} className="p-4">
              <div className="flex gap-4">
                {post.imageUrl && (
                  <div className="w-32 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">Slug: {post.slug}</p>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
                      )}
                      <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                        {post.category && <span>Categoria: {post.category}</span>}
                        <span>Autor: {post.author}</span>
                        <span>Status: {post.isPublished ? "Publicado" : "Rascunho"}</span>
                        <span>Visualizações: {post.viewCount || 0}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
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
            Nenhum post cadastrado
          </Card>
        )}
      </div>
    </div>
  );
}
