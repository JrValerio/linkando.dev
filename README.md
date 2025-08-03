# 🌐 Linkando.dev

> Projeto Fullstack de encurtamento de URLs com autenticação OAuth, dashboard personalizada, proteção de links por senha e métricas de acesso. Desenvolvido com foco em escalabilidade, segurança e UX moderna.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- [Next.js 15 (App Router)](https://nextjs.org/)
- TypeScript + TailwindCSS
- NextAuth.js (Google e GitHub OAuth)
- Axios + Hooks personalizados
- Controllers e Views separadas

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + Refresh Token
- Middleware de proteção de rotas
- Modularização completa (routes, services, controllers)

---

## 📁 Estrutura de Pastas

### 📦 linkando-frontend/
```
linkando-frontend/
├── .env.example
├── README.md
├── public/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── verify-password/page.tsx
│   │   ├── [slug]/page.tsx
│   │   ├── admin/page.tsx
│   │   └── encurtar/page.tsx
│   ├── controllers/
│   │   └── DashboardController.ts
│   ├── views/
│   │   └── DashboardView.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
```

### 🛠️ linkando-backend/
```
linkando-backend/
├── .env.example
├── README.md
├── src/
│   ├── index.ts
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   └── middlewares/
├── tsconfig.json
├── package.json
├── .gitignore
├── setup-oauth.js
```

---

## 🔐 Funcionalidades

| Funcionalidade                  | Status     |
|--------------------------------|------------|
| Login com Google/GitHub        | ✅ Implementado
| Refresh Token                  | ✅ Com cookies seguros
| Encurtar links                 | ✅ Pronto para uso
| Personalização de slug         | ✅ Slug manual ou automático
| Proteção por senha             | ✅ Link acessado só após senha
| Dashboard com links criados    | ✅ Visual e funcional
| Expiração de links             | ✅ Por data definida
| Métricas de acesso             | ✅ IP, navegador e tempo
| Painel admin                   | ✅ Listagem de usuários

---

## ⚙️ Instalação

```bash
# Clonar o projeto
$ git clone https://github.com/JrValerio/linkando.dev

# FRONTEND
$ cd linkando-frontend
$ npm install
$ npm run dev

# BACKEND
$ cd ../linkando-backend
$ npm install
$ npm run dev
```

---

## 📄 Variáveis de Ambiente (`.env`)

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/linkando
JWT_SECRET=suasecretachave

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=qualquercofasegura
```

---

## 📸 Screenshots

> (inserir imagens da Dashboard, página de encurtamento e login com dark mode)

---

## 🙋‍♂️ Contribuindo

- Leia o arquivo [CONTRIBUTING.md](./CONTRIBUTING.md)
- Código de conduta disponível em [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

---

## 👨‍💻 Autor

Projeto desenvolvido por **Amaro Júnior** ([@JrValerio](https://github.com/JrValerio)) e colaboradores.

> Encurte links. Expanda possibilidades. 🚀
