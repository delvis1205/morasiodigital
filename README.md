# Morásio Digital - Plataforma de Recarga de Jogos

Plataforma completa de e-commerce para recarga de jogos em Angola, desenvolvida com React + Node.js.

## 🚀 Tecnologias

### Frontend
- **React 19** - Framework UI
- **Vite** - Build tool e dev server
- **TailwindCSS** - Estilização
- **Wouter** - Roteamento
- **Radix UI** - Componentes acessíveis
- **React Query (TanStack Query)** - Gerenciamento de estado
- **tRPC** - Comunicação type-safe com backend

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **tRPC** - API type-safe
- **Drizzle ORM** - ORM para MySQL
- **MySQL** - Banco de dados
- **JWT (jose)** - Autenticação
- **bcryptjs** - Hash de senhas
- **AWS S3** - Armazenamento de arquivos

## 📦 Funcionalidades

### Para Clientes
- ✅ Navegação por categorias de jogos
- ✅ Catálogo de produtos com filtros
- ✅ Carrinho de compras
- ✅ Checkout com múltiplos métodos de pagamento
- ✅ Sistema de autenticação (registro/login)
- ✅ Perfil de usuário com histórico de pedidos
- ✅ Acompanhamento de pedidos em tempo real
- ✅ Sistema de avaliações de produtos
- ✅ Blog com artigos e guias
- ✅ Assistente virtual (chatbot AI)
- ✅ Suporte via WhatsApp

### Para Administradores
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento completo de produtos (CRUD)
- ✅ Gerenciamento de categorias
- ✅ Gerenciamento de banners (carrossel)
- ✅ Gerenciamento de blog
- ✅ Gerenciamento de pedidos e status
- ✅ Sistema de upload de imagens (S3)
- ✅ Gerenciamento de administradores
- ✅ Configurações de APIs (WhatsApp, etc)
- ✅ Moderação de avaliações

### Métodos de Pagamento Suportados
- Express
- PayPay AO
- Unitel Money
- Transferência Bancária (IBAN - Banco BAI e BFA)
- Pagamento Presencial

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+ 
- MySQL 8+
- pnpm (gerenciador de pacotes)
- Conta AWS S3 (para upload de imagens)

### 1. Clone o repositório
```bash
git clone <repository-url>
cd morasio-digital
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/morasio_digital

# JWT Secret (gere uma chave segura)
JWT_SECRET=sua-chave-secreta-super-segura-aqui

# AWS S3 (para upload de imagens)
AWS_ACCESS_KEY_ID=sua-access-key
AWS_SECRET_ACCESS_KEY=sua-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=seu-bucket-name

# OpenAI (para assistente virtual - opcional)
OPENAI_API_KEY=sua-openai-api-key

# Email (para notificações)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app

# WhatsApp Business API (opcional)
WHATSAPP_ACCOUNT_ID=seu-account-id
WHATSAPP_PHONE_NUMBER_ID=seu-phone-id
WHATSAPP_ACCESS_TOKEN=seu-token

# Ambiente
NODE_ENV=development
PORT=3000
```

### 4. Configure o banco de dados

```bash
# Criar as tabelas
pnpm db:push

# Popular com dados iniciais (opcional)
node seed-data.mjs
```

### 5. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

O servidor estará disponível em: `http://localhost:3000`

## 📦 Build para Produção

```bash
# Build do frontend e backend
pnpm build

# Iniciar servidor de produção
pnpm start
```

## 🚀 Hospedagem

### Opção 1: Hospedagem Tradicional (VPS/Dedicated)

#### Requisitos do Servidor
- Ubuntu 20.04+ ou CentOS 8+
- Node.js 18+
- MySQL 8+
- Nginx (recomendado)
- 2GB RAM mínimo
- 20GB de armazenamento

#### Passos para Deploy

1. **Configure o servidor**
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar MySQL
sudo apt-get install mysql-server
```

2. **Clone e configure o projeto**
```bash
cd /var/www
git clone <repository-url> morasio-digital
cd morasio-digital
pnpm install
```

3. **Configure variáveis de ambiente**
```bash
nano .env
# Adicione todas as variáveis de produção
```

4. **Build e inicie**
```bash
pnpm build
pm2 start npm --name "morasio-digital" -- start
```

5. **Configure Nginx como reverse proxy**
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. **Configure SSL com Let's Encrypt**
```bash
sudo certbot --nginx -d seu-dominio.com
```

### Opção 2: Plataformas Cloud (Recomendado)

#### Heroku
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar aplicação
heroku create morasio-digital

# Adicionar MySQL
heroku addons:create jawsdb:kitefin

# Deploy
git push heroku main
```

#### Vercel/Netlify (Frontend) + Railway/Render (Backend)
Separe frontend e backend para melhor escalabilidade.

#### AWS / Google Cloud / Azure
Use serviços gerenciados:
- **Compute**: EC2 / Cloud Run / App Service
- **Database**: RDS / Cloud SQL / Azure Database
- **Storage**: S3 / Cloud Storage / Blob Storage

### Opção 3: Docker

```dockerfile
# Dockerfile já incluído no projeto
docker build -t morasio-digital .
docker run -p 3000:3000 --env-file .env morasio-digital
```

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Autenticação JWT segura
- Validação de dados com Zod
- Proteção contra SQL injection (Drizzle ORM)
- CORS configurado corretamente
- Uploads de arquivo validados

## 📝 Variáveis de Ambiente Completas

Veja o arquivo `.env.example` para todas as variáveis disponíveis.

## 🎨 Personalização

### Alterar logo e cores
1. Substitua `/client/public/logo.png` com sua logo
2. Edite `/client/src/const.ts` para alterar informações da empresa
3. Modifique cores em `/client/src/index.css`

### Adicionar novos métodos de pagamento
Edite o schema em `/drizzle/schema.ts` e adicione a lógica no backend.

## 📞 Suporte

Para dúvidas ou problemas:
- Email: morasiodigital@gmail.com
- WhatsApp: +244 923 929 712

## 📄 Licença

MIT License - Veja LICENSE para detalhes.

## 🙏 Créditos

Desenvolvido por Morásio Digital com ❤️ para a comunidade gamer de Angola.

---

**🎮 Bons jogos e boas vendas! 🚀**
