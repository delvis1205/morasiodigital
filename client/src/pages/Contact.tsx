import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTACT_PHONE, CONTACT_EMAIL, getWhatsAppLink } from "@/const";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function Contact() {
  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de mais informações sobre os serviços da Morásio Digital.";
    window.open(getWhatsAppLink(message), "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-lg text-muted-foreground">
              Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* WhatsApp */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleWhatsApp}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>WhatsApp</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Atendimento rápido via WhatsApp</p>
                <p className="font-medium">{CONTACT_PHONE}</p>
                <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
                  Abrir WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Telefone</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Ligue para nós</p>
                <p className="font-medium">{CONTACT_PHONE}</p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <a href={`tel:${CONTACT_PHONE}`}>Ligar Agora</a>
                </Button>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>E-mail</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Envie-nos um e-mail</p>
                <p className="font-medium">{CONTACT_EMAIL}</p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <a href={`mailto:${CONTACT_EMAIL}`}>Enviar E-mail</a>
                </Button>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Localização</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Onde estamos</p>
                <p className="font-medium">Luanda, Angola</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Atendimento online 24/7
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Quanto tempo leva para receber minha recarga?</h3>
                <p className="text-sm text-muted-foreground">
                  As recargas são processadas instantaneamente após a confirmação do pagamento, geralmente em poucos minutos.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Quais métodos de pagamento vocês aceitam?</h3>
                <p className="text-sm text-muted-foreground">
                  Aceitamos Express, PayPay AO, Unitel Money, transferência bancária (IBAN) e pagamento presencial.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Posso cancelar meu pedido?</h3>
                <p className="text-sm text-muted-foreground">
                  Pedidos podem ser cancelados antes da confirmação do pagamento. Entre em contato conosco o mais rápido possível.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Como acompanho meu pedido?</h3>
                <p className="text-sm text-muted-foreground">
                  Você pode acompanhar seu pedido através do número fornecido na página de "Acompanhar Pedido".
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
