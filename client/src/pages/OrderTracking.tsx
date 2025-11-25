import { useState } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/const";
import { Search, Package, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

const statusIcons: Record<string, any> = {
  pending: Clock,
  paid: CheckCircle,
  processing: Package,
  completed: CheckCircle,
  cancelled: XCircle,
};

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

const statusDescriptions: Record<string, string> = {
  pending: "Seu pedido foi recebido e está aguardando confirmação de pagamento.",
  paid: "Pagamento confirmado! Estamos processando sua recarga.",
  processing: "Sua recarga está sendo processada. Você receberá em breve.",
  completed: "Recarga concluída com sucesso! Verifique sua conta.",
  cancelled: "Este pedido foi cancelado.",
};

export default function OrderTracking() {
  const [match, params] = useRoute("/pedido/:orderNumber");
  const orderNumberFromUrl = params?.orderNumber;
  
  const [orderNumber, setOrderNumber] = useState(orderNumberFromUrl || "");
  const [searchNumber, setSearchNumber] = useState(orderNumberFromUrl || "");

  const { data: order, isLoading, error } = trpc.orders.getByNumber.useQuery(searchNumber, {
    enabled: !!searchNumber,
  });

  const { data: notifications } = trpc.notifications.getByOrderId.useQuery(order?.id || 0, {
    enabled: !!order?.id,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setSearchNumber(orderNumber.trim());
    }
  };

  const StatusIcon = order ? statusIcons[order.status] : Clock;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold mb-2 text-center">Acompanhar Pedido</h1>
          <p className="text-center text-muted-foreground mb-8">
            Digite o número do seu pedido para acompanhar o status
          </p>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Label htmlFor="orderNumber">Número do Pedido</Label>
                  <Input
                    id="orderNumber"
                    placeholder="Ex: MD1734535890123"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  <Search className="h-4 w-4" />
                  {isLoading ? "Buscando..." : "Buscar Pedido"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Details */}
          {searchNumber && (
            <>
              {isLoading ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Carregando pedido...</p>
                  </CardContent>
                </Card>
              ) : error || !order ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-bold mb-2">Pedido não encontrado</h3>
                    <p className="text-muted-foreground">
                      Verifique o número do pedido e tente novamente.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Status Card */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Status do Pedido</CardTitle>
                        <Badge className={statusColors[order.status]}>
                          {statusLabels[order.status]}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`h-16 w-16 rounded-full ${statusColors[order.status]} bg-opacity-10 flex items-center justify-center flex-shrink-0`}>
                          <StatusIcon className={`h-8 w-8 ${statusColors[order.status].replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <p className="font-bold text-lg">{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleString("pt-AO")}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                        {statusDescriptions[order.status]}
                      </p>

                      {/* Status Timeline */}
                      <div className="space-y-4">
                        <div className={`flex items-center gap-3 ${['pending', 'paid', 'processing', 'completed'].includes(order.status) ? 'text-foreground' : 'text-muted-foreground'}`}>
                          <div className={`h-3 w-3 rounded-full ${['pending', 'paid', 'processing', 'completed'].includes(order.status) ? 'bg-primary' : 'bg-muted'}`} />
                          <span className="text-sm font-medium">Pedido Recebido</span>
                        </div>
                        <div className={`flex items-center gap-3 ${['paid', 'processing', 'completed'].includes(order.status) ? 'text-foreground' : 'text-muted-foreground'}`}>
                          <div className={`h-3 w-3 rounded-full ${['paid', 'processing', 'completed'].includes(order.status) ? 'bg-primary' : 'bg-muted'}`} />
                          <span className="text-sm font-medium">Pagamento Confirmado</span>
                        </div>
                        <div className={`flex items-center gap-3 ${['processing', 'completed'].includes(order.status) ? 'text-foreground' : 'text-muted-foreground'}`}>
                          <div className={`h-3 w-3 rounded-full ${['processing', 'completed'].includes(order.status) ? 'bg-primary' : 'bg-muted'}`} />
                          <span className="text-sm font-medium">Processando Recarga</span>
                        </div>
                        <div className={`flex items-center gap-3 ${order.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}`}>
                          <div className={`h-3 w-3 rounded-full ${order.status === 'completed' ? 'bg-primary' : 'bg-muted'}`} />
                          <span className="text-sm font-medium">Recarga Concluída</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Detalhes do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Produto</p>
                          <p className="font-medium">{order.productName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Jogo</p>
                          <p className="font-medium">{order.gameName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ID do Jogador</p>
                          <p className="font-medium">{order.playerId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Valor Total</p>
                          <p className="font-medium text-primary">{formatPrice(order.totalAmount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Método de Pagamento</p>
                          <p className="font-medium capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Data do Pedido</p>
                          <p className="font-medium">{new Date(order.createdAt).toLocaleDateString("pt-AO")}</p>
                        </div>
                      </div>

                      {order.notes && (
                        <div>
                          <p className="text-sm text-muted-foreground">Observações</p>
                          <p className="text-sm">{order.notes}</p>
                        </div>
                      )}

                      {order.adminNotes && (
                        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                          <p className="text-sm text-muted-foreground">Notas do Admin</p>
                          <p className="text-sm">{order.adminNotes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Customer Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações do Cliente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Nome</p>
                        <p className="font-medium">{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefone</p>
                        <p className="font-medium">{order.customerPhone}</p>
                      </div>
                      {order.customerEmail && (
                        <div>
                          <p className="text-sm text-muted-foreground">E-mail</p>
                          <p className="font-medium">{order.customerEmail}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Notifications */}
                  {notifications && notifications.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Histórico de Notificações</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {notifications.map((notif: any) => (
                            <div key={notif.id} className="flex gap-3 pb-3 border-b last:border-b-0">
                              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{notif.title}</p>
                                <p className="text-xs text-muted-foreground">{notif.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(notif.createdAt).toLocaleString("pt-AO")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
