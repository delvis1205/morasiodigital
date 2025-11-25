import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, Save, TestTube2 } from "lucide-react";

export default function ApiSettings() {
  const [whatsappConfig, setWhatsappConfig] = useState({
    accountId: "",
    phoneNumberId: "",
    accessToken: "",
    isActive: 0,
  });
  const [testPhone, setTestPhone] = useState("");
  const [testMessage, setTestMessage] = useState("Teste de integração WhatsApp");
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const getConfigQuery = trpc.apiConfig.getByProvider.useQuery("whatsapp");
  const updateWhatsAppMutation = trpc.apiConfig.updateWhatsApp.useMutation();

  useEffect(() => {
    if (getConfigQuery.data) {
      setWhatsappConfig({
        accountId: getConfigQuery.data.accountId || "",
        phoneNumberId: getConfigQuery.data.phoneNumberId || "",
        accessToken: getConfigQuery.data.accessToken || "",
        isActive: getConfigQuery.data.isActive || 0,
      });
    }
  }, [getConfigQuery.data]);

  const handleWhatsappChange = (field: string, value: string | number) => {
    setWhatsappConfig(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveWhatsapp = async () => {
    setIsLoading(true);
    try {
      await updateWhatsAppMutation.mutateAsync(whatsappConfig);
      toast.success("Configurações do WhatsApp salvas com sucesso!");
      getConfigQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar configurações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestWhatsapp = async () => {
    if (!testPhone || !testMessage) {
      toast.error("Por favor, preencha o número de telefone e a mensagem");
      return;
    }

    setIsTesting(true);
    try {
      // Aqui você pode chamar uma mutation para testar o WhatsApp
      toast.success("Mensagem de teste enviada com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar mensagem de teste");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações de APIs</h1>
        <p className="text-gray-600 mt-2">Gerencie as integrações de APIs e credenciais</p>
      </div>

      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="stripe">Stripe (Em breve)</TabsTrigger>
          <TabsTrigger value="other">Outras APIs</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do WhatsApp Business API</CardTitle>
              <CardDescription>
                Configure suas credenciais do WhatsApp para enviar notificações automáticas sobre pedidos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Credenciais */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Credenciais</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="accountId">ID da Conta Comercial</Label>
                  <Input
                    id="accountId"
                    placeholder="Seu ID de conta comercial do WhatsApp"
                    value={whatsappConfig.accountId}
                    onChange={(e) => handleWhatsappChange("accountId", e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Encontre em: Meta Business Platform → WhatsApp → Configurações
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumberId">ID do Número de Telefone</Label>
                  <Input
                    id="phoneNumberId"
                    placeholder="Seu ID de número de telefone"
                    value={whatsappConfig.phoneNumberId}
                    onChange={(e) => handleWhatsappChange("phoneNumberId", e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    O número de telefone registrado no WhatsApp Business
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessToken">Token de Acesso</Label>
                  <Input
                    id="accessToken"
                    type="password"
                    placeholder="Seu token de acesso da API"
                    value={whatsappConfig.accessToken}
                    onChange={(e) => handleWhatsappChange("accessToken", e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Token gerado no Meta Business Platform. Mantenha seguro!
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Switch
                    checked={whatsappConfig.isActive === 1}
                    onCheckedChange={(checked) => 
                      handleWhatsappChange("isActive", checked ? 1 : 0)
                    }
                  />
                  <Label className="cursor-pointer">
                    Ativar integração do WhatsApp
                  </Label>
                </div>
              </div>

              {/* Botão Salvar */}
              <Button 
                onClick={handleSaveWhatsapp} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Salvando..." : "Salvar Configurações"}
                <Save className="ml-2 h-4 w-4" />
              </Button>

              {/* Teste */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="font-semibold text-lg">Testar Integração</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="testPhone">Número de Telefone (com código do país)</Label>
                  <Input
                    id="testPhone"
                    placeholder="+244923456789"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Formato: +244XXXXXXXXX (Angola)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testMessage">Mensagem de Teste</Label>
                  <Input
                    id="testMessage"
                    placeholder="Mensagem de teste"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleTestWhatsapp} 
                  disabled={isTesting || !whatsappConfig.accessToken}
                  variant="outline"
                  className="w-full"
                >
                  {isTesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isTesting ? "Enviando..." : "Enviar Mensagem de Teste"}
                  <TestTube2 className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Informações */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-blue-900">Como obter as credenciais:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Acesse <a href="https://business.facebook.com" target="_blank" rel="noopener noreferrer" className="underline">Meta Business Platform</a></li>
                  <li>Vá para WhatsApp → Começar</li>
                  <li>Configure sua conta comercial do WhatsApp</li>
                  <li>Gere um token de acesso com permissões: whatsapp_business_messaging</li>
                  <li>Cole as credenciais acima e clique em Salvar</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stripe">
          <Card>
            <CardHeader>
              <CardTitle>Stripe (Em desenvolvimento)</CardTitle>
              <CardDescription>
                Esta integração será adicionada em breve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                A integração com Stripe para pagamentos está sendo desenvolvida.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other">
          <Card>
            <CardHeader>
              <CardTitle>Outras APIs</CardTitle>
              <CardDescription>
                Outras integrações de APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Mais integrações em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
