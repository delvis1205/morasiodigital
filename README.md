# Morário Digital - Site Institucional Premium

Site institucional moderno, responsivo e premium da **Morário Digital** com design de alta qualidade, animações sofisticadas e experiência de usuário excepcional.

## 🎨 Características Principais

- **Design Premium**: Paleta de cores vibrante (Cyan #00D9FF, Purple #7C3AED, Pink #EC4899)
- **Animações Sofisticadas**: Fade-in/out, glow effects, hover-lift, Intersection Observer, stagger delays
- **Responsivo**: Mobile-first design com suporte completo para desktop e tablet
- **Performance**: Otimizado para velocidade, SEO e Core Web Vitals
- **Logo Oficial**: Integrada em Header, Footer e Favicon
- **Moderno**: React 19 + Tailwind CSS 4 + shadcn/ui + Framer Motion

## 📋 Seções do Site

| Seção | Descrição |
|-------|-----------|
| **Hero Section** | Headline impactante com CTAs principais (Recargas, Loja, WhatsApp) |
| **Sobre** | Descrição da empresa, missão e compromissos |
| **Plataformas** | MD Recargas e Morásio Shop com cards informativos |
| **Serviços** | 6 serviços premium (Criação de Sites, Plataformas Web, Automação, etc) |
| **Missão/Visão/Valores** | Identidade corporativa com cards destacados |
| **CEO** | Delvis de Morais com foto e link LinkedIn |
| **Contactos** | Telefones, emails e botão WhatsApp |
| **Header/Footer** | Navegação responsiva e branding profissional |

## 🛠️ Stack Tecnológico

| Categoria | Tecnologia |
|-----------|-----------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4 |
| **UI Components** | shadcn/ui, Radix UI, Lucide Icons |
| **Animações** | Framer Motion, CSS Animations, Intersection Observer |
| **Build** | Vite, esbuild |
| **Server** | Express.js |
| **Package Manager** | pnpm |

## 📦 Instalação Local

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

## 🌐 Deploy no Render

### Pré-requisitos
- Conta no [Render.com](https://render.com)
- Repositório GitHub conectado

### Passos para Deploy

#### 1. Acesse o Render Dashboard
```
https://dashboard.render.com
```

#### 2. Crie um Novo Web Service
- Clique em **"New +"** → **"Web Service"**
- Conecte seu repositório GitHub
- Selecione o repositório **`delvis1205/morasiodigital`**

#### 3. Configure o Serviço
Preencha os campos com os seguintes valores:

| Campo | Valor |
|-------|-------|
| **Name** | `morasio-digital-site` |
| **Environment** | `Node` |
| **Region** | Frankfurt (ou mais próxima) |
| **Branch** | `main` |
| **Build Command** | `pnpm install && pnpm build` |
| **Start Command** | `pnpm start` |
| **Plan** | Free ou Paid |

#### 4. Variáveis de Ambiente
Adicione (opcional):
- `NODE_ENV`: `production`

#### 5. Deploy
- Clique em **"Create Web Service"**
- Render iniciará o build automaticamente
- Você receberá uma URL pública (ex: `morasio-digital-site.onrender.com`)

## 🔄 Deploy Automático

Após o primeiro deploy, qualquer push para a branch `main` dispara um novo build automaticamente.

```bash
# Fazer push para atualizar o site
git push origin main
```

## 📁 Estrutura do Projeto

```
morasiodigital/
├── client/                      # Frontend React
│   ├── public/                  # Assets estáticos
│   │   ├── images/             # Imagens (logo, backgrounds)
│   │   ├── favicon.png         # Favicon
│   │   └── index.html          # HTML principal
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   ├── Header.tsx      # Navegação responsiva
│   │   │   ├── Footer.tsx      # Rodapé com branding
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx        # Página principal com todas as seções
│   │   │   └── NotFound.tsx    # Página 404
│   │   ├── hooks/
│   │   │   └── useIntersectionAnimation.ts  # Hook para animações ao scroll
│   │   ├── contexts/           # React contexts
│   │   ├── lib/                # Utility functions
│   │   ├── animations.css      # Animações CSS sofisticadas
│   │   ├── index.css           # Estilos globais e tema
│   │   ├── App.tsx             # Componente raiz com routing
│   │   └── main.tsx            # Entry point React
│   └── index.html              # Template HTML com Google Fonts
├── server/                      # Backend Express
│   └── index.ts                # Servidor de produção
├── shared/                      # Tipos compartilhados
├── patches/                     # Patches de dependências
├── package.json                # Dependências e scripts
├── vite.config.ts              # Configuração Vite
├── tsconfig.json               # Configuração TypeScript
├── .gitignore                  # Arquivos ignorados pelo git
├── .prettierrc                 # Configuração Prettier
└── README.md                   # Este arquivo
```

## 🎨 Customização

### Modificar Cores
Edite em `client/src/index.css`:
```css
:root {
  --primary: #0A0E27;           /* Deep navy */
  --accent: #00D9FF;            /* Vibrant cyan */
  --accent-secondary: #7C3AED;  /* Vibrant purple */
  --accent-tertiary: #EC4899;   /* Hot pink */
}
```

### Adicionar/Modificar Animações
Edite em `client/src/animations.css` para adicionar novas animações CSS

### Modificar Conteúdo
Edite em `client/src/pages/Home.tsx` para alterar textos, seções e informações

### Atualizar Logo
Substitua `/client/public/images/logo.png` pela nova logo

### Adicionar Fontes
As fontes Google (Poppins e Inter) estão configuradas em `client/index.html`

## 📞 Informações de Contacto

- **Telefone**: +244 973 929 712 / +244 973 929 713
- **Email**: morasiodigital@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/delvisdemorais/
- **NIF**: 5002678500

## 🔗 Links Importantes

- **GitHub**: https://github.com/delvis1205/morasiodigital
- **Render**: https://render.com
- **Documentação Render**: https://render.com/docs
- **Plataforma MD Recargas**: https://recargas.morasio.shop
- **Loja Morásio Shop**: https://loja.morasio.shop

## 🚀 Recursos Implementados

✅ Design minimalista corporativo futurista  
✅ Paleta de cores premium (Cyan, Purple, Pink)  
✅ Animações sofisticadas com Intersection Observer  
✅ Logo oficial em Header, Footer e Favicon  
✅ Responsivo para mobile e desktop  
✅ Tipografia Poppins + Inter  
✅ Componentes shadcn/ui customizados  
✅ Efeitos glow, hover-lift, fade-in/out  
✅ Todas as seções obrigatórias implementadas  
✅ Pronto para deploy no Render  

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ para Morário Digital**

**Versão**: 1.0.0  
**Última atualização**: Janeiro 2026
