import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/const";
import { toast } from "sonner";
import { Eye, Loader2 } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  paid: "bg-blue-500",
  processing: "bg-purple-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  processing: "Processando",
  completed: "Concluído",
  cancelled: "Cancelado",
};

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: orders, isLoading, refetch } = trpc.admin.orders.list.useQuery();
  const updateStatusMutation = trpc.admin.orders.updateStatus.useMutation();

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;

    setIsUpdating(true);
    try {
      await updateStatusMutation.mutateAsync({
        orderId: selectedOrder.id,
        status: newStatus as any,
        adminNotes: adminNotes || undefined,
      });

      toast.success("Status atualizado com sucesso!");
      refetch();
      setSelectedOrder(null);
      setNewStatus("");
      setAdminNotes("");
    } catch (error) {
      toast.error("Erro ao atualizar status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gerenciar Pedidos</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie todos os pedidos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Carregando...</p>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-lg">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString("pt-AO")}
                      </p>
                    </div>
                    <Badge className={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Cliente</p>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Produto</p>
                      <p className="text-sm text-muted-foreground">{order.productName}</p>
                      <p className="text-sm text-muted-foreground">{order.gameName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">ID do Jogador</p>
                      <p className="text-sm text-muted-foreground">{order.playerId}</p>
                      {order.playerNickname && (
                        <p className="text-sm text-muted-foreground">Nick: {order.playerNickname}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Valor Total</p>
                      <p className="text-lg font-bold text-primary">{formatPrice(order.totalAmount)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.status);
                            setAdminNotes(order.adminNotes || "");
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Pedido {order.orderNumber}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Cliente</Label>
                              <p className="text-sm">{order.customerName}</p>
                              <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                              {order.customerEmail && (
                                <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                              )}
                            </div>
                            <div>
                              <Label>Método de Pagamento</Label>
                              <p className="text-sm capitalize">{order.paymentMethod}</p>
                            </div>
                          </div>

                          {order.proofUrl && (
                            <div>
                              <Label>Comprovante</Label>
                              <a
                                href={order.proofUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                Ver comprovante
                              </a>
                            </div>
                          )}

                          {order.notes && (
                            <div>
                              <Label>Observações do Cliente</Label>
                              <p className="text-sm text-muted-foreground">{order.notes}</p>
                            </div>
                          )}

                          <div>
                            <Label>Atualizar Status</Label>
                            <Select value={newStatus} onValueChange={setNewStatus}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="paid">Pago</SelectItem>
                                <SelectItem value="processing">Processando</SelectItem>
                                <SelectItem value="completed">Concluído</SelectItem>
                                <SelectItem value="cancelled">Cancelado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Notas do Admin</Label>
                            <Textarea
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              placeholder="Adicione observações internas..."
                              rows={3}
                            />
                          </div>

                          <Button
                            onClick={handleUpdateStatus}
                            disabled={isUpdating}
                            className="w-full"
                          >
                            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar Alterações
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Nenhum pedido encontrado
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
