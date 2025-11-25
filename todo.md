# Morásio Digital - Lista de Tarefas

## Banco de Dados e Backend
- [x] Criar schema de banco de dados (categorias, produtos, pedidos, uploads)
- [x] Implementar routers tRPC para produtos (listar, buscar por ID, filtrar)
- [x] Implementar routers tRPC para pedidos (criar, listar, atualizar status)
- [x] Implementar routers tRPC admin (gerenciar produtos, categorias, pedidos)
- [x] Sistema de upload de comprovantes

## Assets e Imagens
- [x] Buscar imagens para jogos (Free Fire, Delta Force, Black Clover, etc)
- [x] Preparar logo da Morásio Digital
- [x] Criar banners promocionais

## Frontend - Páginas Públicas
- [x] Página inicial (Home) com banner dinâmico e destaques
- [x] Página de produtos com catálogo e filtros
- [x] Página individual de produto com detalhes
- [x] Sistema de carrinho de compras
- [x] Página de checkout com formulário completo
- [x] Página de acompanhamento de pedido
- [x] Página de contato com formulário e WhatsApp
- [x] Página Sobre Nós
- [ ] Política de Privacidade e Termos de Serviço

## Frontend - Painel Administrativo
- [x] Dashboard admin com estatísticas
- [ ] Gerenciamento de produtos (adicionar, editar, remover, ativar/desativar)
- [ ] Gerenciamento de categorias
- [x] Gerenciamento de pedidos (visualizar, atualizar status)
- [x] Relatórios de vendas

## Sistema de Pagamento
- [x] Integração com métodos de pagamento (Express, PayPay AO, Unitel Money, IBAN, Presencial)
- [x] Sistema de upload de comprovantes
- [x] Exibição de dados de pagamento no checkout

## Notificações
- [x] Notificação ao admin por e-mail (morasiodigital@gmail.com)
- [x] Integração com WhatsApp para notificações
- [ ] Notificações de status de pedido ao cliente

## Dados Iniciais
- [x] Popular banco com categorias de jogos
- [x] Popular banco com produtos iniciais (Free Fire, Delta Force, Black Clover)
- [x] Configurar preços em Kwanzas

## Design e UX
- [x] Implementar design clean com paleta neutra (preto, branco, cinza, dourado/azul)
- [x] Garantir responsividade mobile/tablet/desktop
- [ ] Adicionar animações e micro-interações
- [ ] Otimizar performance e carregamento

## Testes e Ajustes
- [ ] Testar fluxo completo de compra
- [ ] Testar painel administrativo
- [ ] Verificar notificações
- [ ] Ajustes finais de design


## Gerenciamento de Produtos (Nova Solicitação)
- [x] Criar routers tRPC para CRUD de produtos
- [x] Criar página de listagem de produtos no admin
- [x] Criar formulário de adicionar produto
- [x] Criar formulário de editar produto
- [x] Implementar funcionalidade de deletar produto
- [x] Implementar ativar/desativar produtos
- [x] Adicionar validações de formulário
- [x] Testar fluxo completo de gerenciamento


## Upload de Imagens de Produtos (Nova Solicitação)
- [x] Criar router tRPC para upload de imagens
- [x] Adicionar input de arquivo no formulário
- [x] Implementar preview de imagem
- [x] Integrar upload com S3
- [x] Testar fluxo completo de upload


## Notificações de Pedidos (Nova Solicitação)
- [x] Corrigir router de busca de pedidos por número
- [x] Criar tabela de notificações no banco
- [x] Implementar routers tRPC para notificações
- [x] Adicionar notificações ao criar pedido
- [x] Adicionar notificações ao atualizar status
- [x] Criar página de acompanhamento funcional
- [x] Testar fluxo completo de notificações


## Correção - Página de Acompanhamento (Bug Report)
- [x] Investigar erro 404 na página de acompanhamento
- [x] Corrigir rota e componente
- [x] Testar funcionalidade completa


## Correção - Rota /acompanhar (Bug Report 2)
- [x] Adicionar rota /acompanhar ao App.tsx
- [x] Testar acesso com parâmetro ?from_webdev=1


## Sistema de Autenticação e Perfil de Usuário (Nova Solicitação)
- [x] Atualizar schema com campos de perfil (firstName, lastName, phone, gameId, gameNickname, gameType, deliveryAddress)
- [x] Criar tabela de dados de jogo para usuários
- [x] Implementar routers tRPC para registro, login e gerenciamento de perfil
- [x] Criar página de Registro com validação de email e senha
- [x] Criar página de Login com email e senha
- [x] Criar página de Perfil/Minha Conta com histórico de pedidos
- [x] Implementar restrição de acesso ao painel admin (apenas admins)
- [x] Criar funcionalidade de adicionar novos admins
- [x] Atualizar Header com saudção personalizada e logout
- [x] Integrar dados de jogo salvos no checkout
- [x] Testar fluxo completo de autenticação


## Bug Fix - Autenticação (Bug Report 3)
- [x] Investigar problema de sessão não ser mantida após login
- [x] Verificar router de login no server/routers.ts
- [x] Corrigir cookie de sessão
- [x] Testar fluxo de login e verificar se usuário fica logado


## Bug Fix - Autenticação Persistente (Bug Report 4)
- [x] Verificar se o JWT está sendo criado corretamente
- [x] Verificar se o cookie está sendo setado no navegador
- [x] Verificar se useAuth() está lendo o cookie corretamente
- [x] Testar fluxo completo de login e verificação de sessão


## Integração WhatsApp API (Nova Solicitação)
- [x] Configurar credenciais da API WhatsApp
- [x] Criar router tRPC para envio de mensagens
- [x] Adicionar função para enviar mensagem de confirmação de pedido
- [x] Adicionar função para enviar atualizações de status
- [x] Integrar envio automático ao atualizar status de pedido
- [x] Testar fluxo completo de notificações WhatsApp


## Bug Fix - API Settings (Bug Report 5)
- [ ] Corrigir erro de undefined no router getByProvider
- [ ] Corrigir helpers de banco de dados para retornar valores válidos
- [ ] Testar página de API settings


## Ajustes Finais (Bug Report 6)
- [x] Corrigir erro de undefined no router getByProvider
- [x] Criar página de Política de Privacidade
- [x] Criar página de Termos de Serviço
- [x] Adicionar rotas /privacidade e /termos ao App.tsx
- [x] Adicionar links no Footer para as novas páginas
- [x] Testar todas as páginas


## Assistente Virtual Freth RJA (Nova Solicitação)
- [x] Criar componente de chat do assistente
- [x] Implementar ícone atraente e flutuante
- [x] Integrar LLM para respostas inteligentes
- [x] Implementar varredura do site para contexto
- [x] Criar função para enviar perguntas para WhatsApp
- [x] Testar fluxo completo do assistente

## Responsividade e Correções (Nova Solicitação)
- [x] Corrigir páginas de Política de Privacidade
- [x] Corrigir páginas de Termos de Serviço
- [x] Otimizar layout para smartphones
- [x] Testar responsividade em múltiplos dispositivos
- [x] Ajustar imagens e fontes para mobile


## Blog (Nova Solicitação)
- [x] Criar schema de posts do blog no banco de dados
- [ ] Implementar routers tRPC para CRUD de posts
- [ ] Criar página de listagem de posts
- [ ] Criar página de detalhe do post
- [ ] Adicionar link no Header/Footer para blog
- [ ] Popular com posts iniciais

## Sistema de Avaliações (Nova Solicitação)
- [x] Criar schema de avaliações no banco de dados
- [ ] Implementar routers tRPC para criar/listar avaliações
- [ ] Criar componente de avaliação com estrelas
- [ ] Adicionar avaliações na página de detalhes do produto
- [ ] Mostrar média de avaliações
- [ ] Testar fluxo de avaliação

## Correções do Assistente (Bug Report 7)
- [x] Corrigir apresentação repetida do assistente
- [x] Implementar contexto de conversa persistente
- [x] Melhorar qualidade das respostas
- [x] Testar fluxo de chat

## Página de Suporte (Bug Report 8)
- [x] Criar página de suporte funcional
- [x] Adicionar formulário de contato
- [x] Integrar com WhatsApp
- [x] Adicionar link no Header/Footer
- [x] Testar funcionalidade


## Melhorias de UX (Nova Solicitação)
- [x] Corrigir responsividade do painel admin em smartphones
- [x] Adicionar menu colapsável/hambúrguer para admin
- [x] Melhorar formatação das respostas do assistente
- [x] Remover apresentação repetida do assistente
- [x] Adicionar quebras de linha e organização nas respostas


## Sistema de Banners (Nova Solicitação)
- [ ] Criar schema de banners no banco de dados
- [ ] Implementar routers tRPC para CRUD de banners
- [ ] Criar página admin de gerenciamento de banners
- [ ] Adicionar upload de imagem para banners
- [ ] Implementar carrossel de banners na home
- [ ] Adicionar links clicáveis nos banners
- [ ] Testar funcionalidade completa

## Gerenciamento de Categorias (Nova Solicitação)
- [ ] Implementar routers tRPC para CRUD de categorias
- [ ] Criar página admin de gerenciamento de categorias
- [ ] Adicionar upload de imagem para categorias
- [ ] Atualizar exibição de categorias na home
- [ ] Testar funcionalidade completa

## Upload de Comprovante (Nova Solicitação)
- [ ] Adicionar campo de upload no checkout
- [ ] Implementar upload para S3
- [ ] Salvar URL do comprovante no pedido
- [ ] Enviar comprovante por email na notificação
- [ ] Testar fluxo completo


## Pop-ups de Anúncios (Nova Solicitação)
- [ ] Criar schema de pop-ups no banco de dados
- [ ] Implementar routers tRPC para CRUD de pop-ups
- [ ] Criar página admin de gerenciamento de pop-ups
- [ ] Implementar componente de pop-up na home com botão fechar
- [ ] Adicionar links clicáveis nas imagens dos pop-ups
- [ ] Testar funcionalidade completa
