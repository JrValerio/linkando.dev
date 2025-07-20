# Configuração de Autenticação OAuth

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/linkando

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

# Frontend URL
FRONTEND_URL=http://localhost:3001

# Server
PORT=3000
```

## Configuração do Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá para "APIs & Services" > "Credentials"
4. Clique em "Create Credentials" > "OAuth 2.0 Client IDs"
5. Configure:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
6. Copie o Client ID e Client Secret para o arquivo `.env`

## Configuração do GitHub OAuth

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Clique em "New OAuth App"
3. Configure:
   - Application name: Linkando
   - Homepage URL: `http://localhost:3001`
   - Authorization callback URL: `http://localhost:3000/api/auth/github/callback`
4. Copie o Client ID e Client Secret para o arquivo `.env`

## Endpoints da API

### Autenticação OAuth
- `GET /api/auth/google` - Iniciar login com Google
- `GET /api/auth/google/callback` - Callback do Google
- `GET /api/auth/github` - Iniciar login com GitHub
- `GET /api/auth/github/callback` - Callback do GitHub

### Tokens
- `POST /api/auth/refresh` - Renovar tokens
- `POST /api/auth/logout` - Fazer logout (protegido)
- `GET /api/auth/profile` - Obter perfil do usuário (protegido)

### URLs (Usuários)
- `POST /api/urls/shorten` - Criar URL curta (opcional: autenticado)
- `GET /api/urls/:shortUrl` - Redirecionar para URL original
- `GET /api/urls/user/urls` - Obter URLs do usuário (protegido)
- `DELETE /api/urls/:shortUrl` - Deletar URL (protegido)

### Admin (Apenas Administradores)
- `GET /api/admin/urls` - Obter todas as URLs com paginação
- `GET /api/admin/urls/user/:userId` - Obter URLs de um usuário específico
- `DELETE /api/admin/urls/:shortUrl` - Deletar qualquer URL
- `GET /api/admin/users` - Obter todos os usuários
- `GET /api/admin/users/:userId` - Obter detalhes de um usuário
- `PATCH /api/admin/users/:userId/admin` - Promover/remover admin
- `GET /api/admin/stats` - Obter estatísticas gerais

## Como usar

### Autenticação
1. **Login com Google:**
   ```
   GET http://localhost:3000/api/auth/google
   ```

2. **Login com GitHub:**
   ```
   GET http://localhost:3000/api/auth/github
   ```

3. **Refresh Token:**
   ```json
   POST http://localhost:3000/api/auth/refresh
   {
     "refreshToken": "seu-refresh-token"
   }
   ```

4. **Acessar rota protegida:**
   ```
   GET http://localhost:3000/api/auth/profile
   Authorization: Bearer seu-access-token
   ```

### URLs
5. **Criar URL curta:**
   ```json
   POST http://localhost:3000/api/urls/shorten
   {
     "originalUrl": "https://www.google.com",
     "isPrivate": false,
     "password": null
   }
   ```

6. **Criar URL privada:**
   ```json
   POST http://localhost:3000/api/urls/shorten
   {
     "originalUrl": "https://www.google.com",
     "isPrivate": true,
     "password": "minhasenha123"
   }
   ```

7. **Acessar URL privada:**
   ```
   GET http://localhost:3000/api/urls/ABC123?password=minhasenha123
   ```

### Admin
8. **Obter todas as URLs:**
   ```
   GET http://localhost:3000/api/admin/urls?page=1&limit=20
   Authorization: Bearer seu-access-token
   ```

9. **Obter estatísticas:**
   ```
   GET http://localhost:3000/api/admin/stats
   Authorization: Bearer seu-access-token
   ```

10. **Promover usuário a admin:**
    ```json
    PATCH http://localhost:3000/api/admin/users/USER_ID/admin
    Authorization: Bearer seu-access-token
    {
      "isAdmin": true
    }
    ```

## Tornar um Usuário Admin

Para tornar um usuário administrador, use o script:

```bash
node scripts/makeAdmin.js usuario@exemplo.com
```

## Fluxo de Autenticação

1. Usuário acessa `/api/auth/google` ou `/api/auth/github`
2. É redirecionado para o provedor OAuth
3. Após autenticação, é redirecionado para o callback
4. O callback gera JWT e refresh token
5. Usuário é redirecionado para o frontend com os tokens
6. Frontend armazena os tokens e usa para requisições protegidas
7. Quando o JWT expira, usa o refresh token para obter novos tokens

## Funcionalidades de Admin

- **Visualizar todas as URLs:** Acesso completo a todas as URLs criadas por todos os usuários
- **Gerenciar usuários:** Ver todos os usuários, promover/remover admins
- **Estatísticas:** Dashboard com métricas gerais da plataforma
- **Deletar URLs:** Pode deletar qualquer URL, independente do proprietário
- **Paginação:** Todas as listas suportam paginação para melhor performance 