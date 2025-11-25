import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

export default function AdminsPage() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const createAdminMutation = trpc.admin.admins.createAdmin.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
        toast.error("Por favor, preencha todos os campos");
        return;
      }

      if (formData.password.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres");
        return;
      }

      await createAdminMutation.mutateAsync(formData);
      toast.success("Admin criado com sucesso!");
      setFormData({ email: "", password: "", firstName: "", lastName: "" });
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar admin");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Admins</h1>
          <p className="text-muted-foreground">Crie novos administradores para o sistema</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Admin</DialogTitle>
              <DialogDescription>
                Preencha os dados para criar uma nova conta de administrador
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Primeiro Nome</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="João"
                    disabled={createAdminMutation.isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Último Nome</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Silva"
                    disabled={createAdminMutation.isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@email.com"
                  disabled={createAdminMutation.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={createAdminMutation.isPending}
                />
              </div>

              <Button type="submit" className="w-full" disabled={createAdminMutation.isPending}>
                {createAdminMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {createAdminMutation.isPending ? "Criando..." : "Criar Admin"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações</CardTitle>
          <CardDescription>
            Apenas administradores podem acessar o painel de controle e gerenciar produtos, pedidos e outros admins.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Clique no botão "Novo Admin" acima para criar uma nova conta de administrador.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
