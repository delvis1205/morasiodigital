import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Loader2, Trash2, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    deliveryAddress: user?.deliveryAddress || "",
  });

  const profileQuery = trpc.user.profile.useQuery();
  const ordersQuery = trpc.user.orders.useQuery();
  const gameDataQuery = trpc.user.gameData.useQuery();
  const updateProfileMutation = trpc.user.updateProfile.useMutation();
  const addGameDataMutation = trpc.user.addGameData.useMutation();
  const deleteGameDataMutation = trpc.user.deleteGameData.useMutation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  const handleProfileUpdate = async () => {
    try {
      await updateProfileMutation.mutateAsync(formData);
      toast.success("Perfil atualizado com sucesso!");
      setEditMode(false);
      profileQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar perfil");
    }
  };

  const handleDeleteGameData = async (gameDataId: number) => {
    try {
      await deleteGameDataMutation.mutateAsync(gameDataId);
      toast.success("Dados de jogo removidos");
      gameDataQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover dados");
    }
  };

  const totalSpent = ordersQuery.data?.reduce((sum, order) => sum + order.totalAmount, 0) || 0;
  const completedOrders = ordersQuery.data?.filter(o => o.status === "completed").length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>

          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="perfil">Perfil</TabsTrigger>
              <TabsTrigger value="jogos">Dados de Jogo</TabsTrigger>
              <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
            </TabsList>

            {/* Perfil Tab */}
            <TabsContent value="perfil" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Gerencie suas informações de conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editMode ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Primeiro Nome</Label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            placeholder="João"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Último Nome</Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            placeholder="Silva"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          value={user.email || ""}
                          disabled
                          className="bg-slate-100"
                        />
                        <p className="text-sm text-slate-500">Email não pode ser alterado</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Número de Telefone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+244 923 456 789"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Endereço de Entrega</Label>
                        <Input
                          value={formData.deliveryAddress}
                          onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                          placeholder="Rua, número, bairro, cidade"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleProfileUpdate} disabled={updateProfileMutation.isPending}>
                          {updateProfileMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Salvar Alterações
                        </Button>
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-600">Primeiro Nome</p>
                          <p className="text-lg">{user.firstName || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-600">Último Nome</p>
                          <p className="text-lg">{user.lastName || "—"}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-600">Email</p>
                        <p className="text-lg">{user.email}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-600">Número de Telefone</p>
                        <p className="text-lg">{user.phone || "—"}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-600">Endereço de Entrega</p>
                        <p className="text-lg">{user.deliveryAddress || "—"}</p>
                      </div>

                      <Button onClick={() => setEditMode(true)}>
                        Editar Perfil
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo da Conta</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Total Gasto</p>
                    <p className="text-2xl font-bold">{(totalSpent / 100).toFixed(2)} Kz</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Pedidos Concluídos</p>
                    <p className="text-2xl font-bold">{completedOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total de Pedidos</p>
                    <p className="text-2xl font-bold">{ordersQuery.data?.length || 0}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dados de Jogo Tab */}
            <TabsContent value="jogos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Dados de Jogo</CardTitle>
                  <CardDescription>Configure seus IDs e nicknames de jogo para compras rápidas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {gameDataQuery.data && gameDataQuery.data.length > 0 ? (
                    <div className="space-y-3">
                      {gameDataQuery.data.map((gameData) => (
                        <div key={gameData.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{gameData.gameType}</p>
                            <p className="text-sm text-slate-600">ID: {gameData.gameId}</p>
                            <p className="text-sm text-slate-600">Nickname: {gameData.gameNickname || "—"}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteGameData(gameData.id)}
                            disabled={deleteGameDataMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">Nenhum dado de jogo configurado</p>
                  )}
                  
                  <Button className="w-full" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Novo Jogo
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pedidos Tab */}
            <TabsContent value="pedidos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pedidos</CardTitle>
                  <CardDescription>Acompanhe todos os seus pedidos</CardDescription>
                </CardHeader>
                <CardContent>
                  {ordersQuery.data && ordersQuery.data.length > 0 ? (
                    <div className="space-y-3">
                      {ordersQuery.data.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                          <div className="flex-1">
                            <p className="font-medium">Pedido #{order.orderNumber}</p>
                            <p className="text-sm text-slate-600">{order.productName}</p>
                            <p className="text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString('pt-AO')}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{(order.totalAmount / 100).toFixed(2)} Kz</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {order.status === 'completed' ? 'Concluído' :
                               order.status === 'paid' ? 'Pago' :
                               order.status === 'processing' ? 'Processando' :
                               'Pendente'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600 text-center py-8">Você ainda não fez nenhum pedido</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
