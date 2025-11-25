import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, PAYMENT_METHODS, getWhatsAppLink } from "@/const";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type PaymentMethod = keyof typeof PAYMENT_METHODS;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const gameDataQuery = trpc.user.gameData.useQuery(undefined, { enabled: !!user });

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    playerId: "",
    playerNickname: "",
    paymentMethod: "express" as PaymentMethod,
    notes: "",
  });

  const createOrderMutation = trpc.orders.create.useMutation();

  // Auto-fill form with user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerName: prev.customerName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        customerEmail: prev.customerEmail || user.email || "",
        customerPhone: prev.customerPhone || user.phone || "",
      }));
    }

    // Auto-fill game data if available
    if (gameDataQuery.data && gameDataQuery.data.length > 0) {
      const defaultGame = gameDataQuery.data.find(g => g.isDefault) || gameDataQuery.data[0];
      if (defaultGame) {
        setFormData(prev => ({
          ...prev,
          playerId: prev.playerId || defaultGame.gameId,
          playerNickname: prev.playerNickname || defaultGame.gameNickname || "",
        }));
      }
    }
  }, [user, gameDataQuery.data]);

  if (items.length === 0) {
    setLocation("/carrinho");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Assuming single item for simplicity - adjust for multiple items if needed
      const item = items[0];
      
      const result = await createOrderMutation.mutateAsync({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail || undefined,
        customerPhone: formData.customerPhone,
        playerId: formData.playerId,
        playerNickname: formData.playerNickname || undefined,
        gameName: item.gameName,
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: item.quantity,
        totalAmount,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes || undefined,
      });

      clearCart();
      toast.success("Pedido criado com sucesso!", {
        description: `Número do pedido: ${result.orderNumber}`,
      });

      // Redirect to order tracking
      setLocation(`/pedido/${result.orderNumber}`);
    } catch (error) {
      toast.error("Erro ao criar pedido", {
        description: "Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppCheckout = () => {
    const item = items[0];
    const paymentInfo = PAYMENT_METHODS[formData.paymentMethod];
    
    const message = `*Novo Pedido - Morásio Digital*\n\n` +
      `*Cliente:* ${formData.customerName}\n` +
      `*Telefone:* ${formData.customerPhone}\n` +
      `*Email:* ${formData.customerEmail || "N/A"}\n\n` +
      `*Jogo:* ${item.gameName}\n` +
      `*Produto:* ${item.productName}\n` +
      `*Quantidade:* ${item.quantity}\n` +
      `*Valor Total:* ${formatPrice(totalAmount)}\n\n` +
      `*ID do Jogador:* ${formData.playerId}\n` +
      `*Nickname:* ${formData.playerNickname || "N/A"}\n\n` +
      `*Método de Pagamento:* ${paymentInfo.name}\n` +
      `${"number" in paymentInfo ? `*Número:* ${paymentInfo.number}\n` : ""}` +
      `${formData.notes ? `\n*Observações:* ${formData.notes}` : ""}`;

    window.open(getWhatsAppLink(message), "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Nome Completo *</Label>
                    <Input
                      id="customerName"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Telefone *</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customerEmail">E-mail (opcional)</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Game Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Jogo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user && gameDataQuery.data && gameDataQuery.data.length > 0 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mb-4">
                    <p className="text-sm text-blue-800">
                      Seus dados de jogo salvos foram preenchidos automaticamente. Você pode alterá-los abaixo.
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="playerId">ID do Jogador *</Label>
                    <Input
                      id="playerId"
                      required
                      value={formData.playerId}
                      onChange={(e) => setFormData({ ...formData, playerId: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="playerNickname">Nickname (opcional)</Label>
                    <Input
                      id="playerNickname"
                      value={formData.playerNickname}
                      onChange={(e) => setFormData({ ...formData, playerNickname: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value as PaymentMethod })}
                >
                  {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                    <div key={key} className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                      <RadioGroupItem value={key} id={key} />
                      <div className="flex-1">
                        <Label htmlFor={key} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        {"number" in method && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Número: {method.number}
                          </p>
                        )}
                        {"holder" in method && (
                          <p className="text-sm text-muted-foreground">
                            Titular: {method.holder}
                          </p>
                        )}
                        {"description" in method && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {method.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Observações (opcional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Informações adicionais sobre o pedido..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(item.productPrice * item.quantity)}</p>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                size="lg"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Finalizar no Site
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleWhatsAppCheckout}
              >
                Continuar no WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
