# 📎 Linkando.dev – Encurtador de URLs

Linkando.dev é um projeto desenvolvido pela Squad 2 do Juniando, com o objetivo de simular um ambiente real de desenvolvimento colaborativo. Trata-se de uma aplicação web para encurtar URLs, com opção de links privados com senha, autenticação via Google/GitHub e dashboard com métricas.

---

## 🚀 Funcionalidades

### Para usuários autenticados:
- [x] Login via Google ou GitHub
- [x] Encurtar links com slug personalizado ou automático
- [x] Definir se o link é público ou privado (com senha)
- [x] Visualizar histórico de links encurtados
- [x] Acompanhar métricas de acessos (número de cliques, data de criação)

### Para visitantes:
- [x] Acessar links públicos diretamente
- [x] Acessar links privados mediante senha

### Para administradores:
- [ ] Visualizar todos os links e usuários
- [ ] Painel com gráficos de uso geral da plataforma

---

## 🧑‍💻 Squad 2

**Analistas:**
- Amaro Valério da Silva Junior
- Adryann Geovanny Araújo de Brito Costa

**Frontend:**
- Gabriel Moreira Lemes
- Rafaela Aparecida Góes da Silva
- Pablo Rossoni
- Alexsandro Cristiano Gonçalves da Silva
- Victor Alves de Andrade Oliveira
- Luís Otávio Pessôa da Silva
- Natanael Melo
- Luiz Davi Duarte Serafim

**Backend:**
- Andrius Anselmi
- Heloise Vitória Nunes
- Lucas Ximenes dos Santos

---

## 🧰 Tecnologias Utilizadas

### Frontend
- Next.js / React
- TailwindCSS
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT + OAuth (Google/GitHub)

---

## 📁 Estrutura do Projeto

**/frontend** → Aplicação Next.js com rotas de login, dashboard e encurtamento

**/backend** → API REST com rotas para CRUD de links, autenticação e métricas

---

## 📦 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/JrValerio/linkando.dev.git

# Acesse as pastas e instale dependências
cd frontend
npm install

cd ../backend
npm install
```

Configure as variáveis de ambiente com `.env.example` e rode:
```bash
npm run dev
```

---

## 🧪 Testes
Ainda não implementado.

---

## 🧠 Como colaborar de forma organizada

### 🔀 Branches e Pull Requests
- Sempre crie uma nova branch para sua tarefa:
```bash
git checkout -b feat/nome-da-funcionalidade
```
- Após terminar, dê push e abra um Pull Request com o título claro e objetivo:
```bash
git push origin feat/nome-da-funcionalidade
```
- No PR, descreva o que foi feito, o que testou e se há algo pendente
- Nunca suba direto na `main` ou `develop`, sempre via PR

### ✅ Commits semânticos
Use esse padrão para facilitar leitura e rastreabilidade:
```
feat: adiciona nova funcionalidade
fix: corrige erro específico
refactor: melhora o código sem alterar funcionalidade
style: muda estilo (CSS, indentação...)
docs: alteração em documentação
```
Exemplo:
```bash
git commit -m "feat: cria formulário de encurtamento de link"
```

### 🚨 Merges
- Antes de dar merge, revise o PR (pode pedir ajuda a outros devs)
- Dê merge apenas se tudo estiver testado/localmente funcional
- Use **Squash & Merge** para manter histórico limpo

---

## 📚 Documentação
> Em breve um link para a documentação completa da API com Swagger ou Postman.

---

## 📬 Contribuições
1. Fork este repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: minha funcionalidade'`
4. Push: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📃 Licença
MIT — à vontade para usar, contribuir e compartilhar!
