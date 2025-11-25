# 🚀 Guia Rápido de Deploy - Morásio Digital

## Método 1: Docker (Recomendado)

### Pré-requisitos
- Docker e Docker Compose instalados
- Arquivo `.env` configurado

### Deploy em 3 passos

```bash
# 1. Clone o repositório
git clone <repository-url>
cd morasio-digital

# 2. Configure o .env
cp .env.example .env
nano .env  # Edite com suas configurações

# 3. Inicie os containers
docker-compose up -d

# Verificar logs
docker-compose logs -f app
```

Acesse: http://localhost:3000

---

## Método 2: VPS (Ubuntu 20.04+)

### 1. Preparar servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Instalar Nginx
sudo apt install nginx -y

# Instalar PM2 (gerenciador de processos)
npm install -g pm2

# Instalar Certbot (SSL grátis)
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Configurar banco de dados

```bash
# Entrar no MySQL
sudo mysql

# Criar banco e usuário
CREATE DATABASE morasio_digital;
CREATE USER 'morasio_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON morasio_digital.* TO 'morasio_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Deploy da aplicação

```bash
# Criar diretório
sudo mkdir -p /var/www/morasio-digital
cd /var/www/morasio-digital

# Clonar repositório
git clone <repository-url> .

# Instalar dependências
pnpm install

# Configurar .env
cp .env.example .env
nano .env  # Editar configurações

# Build
pnpm build

# Criar tabelas do banco
pnpm db:push

# Popular dados iniciais (opcional)
node seed-data.mjs

# Iniciar com PM2
pm2 start npm --name "morasio-digital" -- start
pm2 save
pm2 startup
```

### 4. Configurar Nginx

```bash
# Criar configuração
sudo nano /etc/nginx/sites-available/morasio-digital

# Adicionar:
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 50M;
    }
}

# Ativar site
sudo ln -s /etc/nginx/sites-available/morasio-digital /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Configurar SSL (Let's Encrypt)

```bash
# Obter certificado SSL grátis
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com

# Renovação automática
sudo certbot renew --dry-run
```

---

## Método 3: Heroku

```bash
# 1. Instalar Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Criar app
heroku create morasio-digital

# 4. Adicionar MySQL
heroku addons:create jawsdb:kitefin

# 5. Configurar variáveis
heroku config:set JWT_SECRET=sua-chave-secreta
heroku config:set AWS_ACCESS_KEY_ID=sua-access-key
# ... adicionar todas as variáveis necessárias

# 6. Deploy
git push heroku main

# 7. Criar tabelas
heroku run pnpm db:push
```

---

## Método 4: Vercel (Frontend) + Railway (Backend)

### Frontend (Vercel)
1. Conecte repositório no Vercel
2. Configure build:
   - Build Command: `pnpm build`
   - Output Directory: `dist/client`
3. Adicione variáveis de ambiente da API backend

### Backend (Railway)
1. Crie projeto no Railway
2. Adicione MySQL database
3. Conecte repositório
4. Configure variáveis de ambiente
5. Deploy automático

---

## Checklist Pós-Deploy ✅

- [ ] Site acessível via domínio
- [ ] SSL configurado (HTTPS)
- [ ] Banco de dados populado
- [ ] Upload de imagens funcionando (S3)
- [ ] Emails sendo enviados
- [ ] WhatsApp API configurada
- [ ] Checkout e pagamento funcionando
- [ ] Painel admin acessível
- [ ] Criar primeiro usuário admin
- [ ] Testar fluxo completo de compra
- [ ] Configurar backups automáticos
- [ ] Configurar monitoramento (Uptimerobot, etc)

---

## Comandos Úteis

### PM2
```bash
pm2 list                    # Listar processos
pm2 logs morasio-digital    # Ver logs
pm2 restart morasio-digital # Reiniciar
pm2 stop morasio-digital    # Parar
pm2 delete morasio-digital  # Remover
```

### Docker
```bash
docker-compose up -d        # Iniciar
docker-compose down         # Parar
docker-compose logs -f app  # Ver logs
docker-compose restart app  # Reiniciar app
docker-compose ps           # Status dos containers
```

### Git (Atualizações)
```bash
cd /var/www/morasio-digital
git pull origin main
pnpm install
pnpm build
pm2 restart morasio-digital
```

---

## Troubleshooting

### Porta 3000 em uso
```bash
# Encontrar processo
sudo lsof -i :3000

# Matar processo
sudo kill -9 <PID>
```

### Erro de conexão com banco
```bash
# Verificar status do MySQL
sudo systemctl status mysql

# Reiniciar MySQL
sudo systemctl restart mysql

# Ver logs
sudo tail -f /var/log/mysql/error.log
```

### Upload de imagens não funciona
- Verifique credenciais AWS no `.env`
- Confirme permissões do bucket S3
- Teste acesso ao bucket

---

## Backups

### Backup manual do banco
```bash
# Exportar
mysqldump -u morasio_user -p morasio_digital > backup-$(date +%Y%m%d).sql

# Importar
mysql -u morasio_user -p morasio_digital < backup-YYYYMMDD.sql
```

### Backup automático (cron)
```bash
# Editar crontab
crontab -e

# Adicionar (backup diário às 2h)
0 2 * * * mysqldump -u morasio_user -p'senha' morasio_digital > /backups/db-$(date +\%Y\%m\%d).sql
```

---

## Monitoramento

### Logs
```bash
# PM2 logs
pm2 logs morasio-digital --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Application logs
tail -f /var/www/morasio-digital/logs/app.log
```

### Recursos do servidor
```bash
# CPU e Memória
top
htop

# Espaço em disco
df -h

# Conexões
netstat -tulpn
```

---

## 🆘 Suporte

Problemas? Entre em contato:
- Email: morasiodigital@gmail.com
- WhatsApp: +244 923 929 712

---

**🎮 Boa sorte com o deploy! 🚀**
