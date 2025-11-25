# =========================================
# Morásio Digital - Dockerfile (corrigido Node 22)
# =========================================
# Multi-stage build para otimizar tamanho da imagem
# =========================================

# Stage 1: Build
FROM node:22-alpine AS builder

# Instalar pnpm
RUN npm install -g pnpm

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências e patches
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar o restante do código fonte
COPY . .

# Build da aplicação
RUN pnpm build

# =========================================
# Stage 2: Production
FROM node:22-alpine

# Instalar pnpm
RUN npm install -g pnpm

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas o necessário do stage de build
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./
COPY --from=builder --chown=nodejs:nodejs /app/pnpm-lock.yaml ./
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nodejs:nodejs /app/patches ./patches

# Instalar apenas dependências de produção
RUN pnpm install --prod --frozen-lockfile

# Usar usuário não-root
USER nodejs

# Expor porta
EXPOSE 3000

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Iniciar aplicação
CMD ["node", "dist/index.js"]
