import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Phone, Mail, Clock, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const contactMutation = trpc.support.sendMessage.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);
    try {
      await contactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12 md:py-16">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Central de Suporte</h1>
            <p className="text-lg text-blue-100">Estamos aqui para ajudar! Entre em contato conosco</p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* WhatsApp */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">WhatsApp</h3>
                </div>
                <p className="text-gray-600 mb-4">Chat rápido e direto com nosso time</p>
                <a
                  href="https://wa.me/244923929712?text=Olá,%20gostaria%20de%20ajuda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  +244 923 929 712
                </a>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Email</h3>
                </div>
                <p className="text-gray-600 mb-4">Envie sua dúvida por email</p>
                <a
                  href="mailto:morasiodigital@gmail.com"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors break-all"
                >
                  morasiodigital@gmail.com
                </a>
              </div>

              {/* Hours */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold">Horário</h3>
                </div>
                <p className="text-gray-600 mb-2">Segunda a Sexta</p>
                <p className="text-lg font-semibold text-gray-900">08:00 - 18:00</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Envie sua Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+244 923 929 712"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Assunto da sua mensagem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva seu problema ou dúvida..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isLoading ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-white p-6 rounded-lg border border-gray-200 group cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                  <span>Como faço para rastrear meu pedido?</span>
                  <span className="text-xl">+</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Você pode rastrear seu pedido na página "Acompanhar Pedido". Basta inserir o número do seu pedido para ver o status e histórico de notificações.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg border border-gray-200 group cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                  <span>Quais são os métodos de pagamento?</span>
                  <span className="text-xl">+</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Aceitamos Express, PayPay AO, Unitel Money, IBAN e pagamento presencial. Escolha o método que preferir no checkout.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg border border-gray-200 group cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                  <span>Quanto tempo leva para receber meu pedido?</span>
                  <span className="text-xl">+</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  A maioria dos pedidos é entregue em até 24 horas após a confirmação do pagamento. Você receberá notificações sobre o status do seu pedido.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg border border-gray-200 group cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                  <span>Como faço para criar uma conta?</span>
                  <span className="text-xl">+</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Clique em "Entrar" no topo da página e selecione "Criar Conta". Preencha seus dados e pronto! Sua conta estará criada.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg border border-gray-200 group cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-900 group-open:text-blue-600">
                  <span>Posso cancelar ou modificar meu pedido?</span>
                  <span className="text-xl">+</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim! Entre em contato conosco via WhatsApp ou email assim que possível. Se o pedido ainda não foi processado, podemos cancelar ou modificar.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
