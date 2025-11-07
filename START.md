# 🚀 GUIA COMPLETO - CONFIGURAÇÃO E EXECUÇÃO

## ⚡ Início Rápido (3 passos)

### 1️⃣ Configure o Banco de Dados

**Opção A: Executar Script SQL (RECOMENDADO)**

1. Abra o **SQL Server Management Studio (SSMS)** ou **Azure Data Studio**
2. Conecte-se ao seu servidor SQL Server
3. Abra o arquivo `prisma/manual_migration.sql`
4. Execute todo o script (F5 ou Ctrl+E)
5. Verifique se as mensagens de sucesso apareceram

**Opção B: Usar Prisma Migrate**

```bash
# Configure o .env primeiro (veja passo 2)
npx prisma migrate dev --name inicial
```

### 2️⃣ Configure o arquivo .env

Edite o arquivo `.env` na raiz do projeto e substitua pelas suas credenciais:

```env
DATABASE_URL="sqlserver://localhost:1433;database=UniDB;user=sa;password=SUA_SENHA_AQUI;encrypt=true;trustServerCertificate=true"
PORT=3000
```

**Exemplos de connection string:**

```env
# SQL Server Express (instância nomeada)
DATABASE_URL="sqlserver://localhost\\SQLEXPRESS:1433;database=UniDB;user=sa;password=MinhaS3nha;encrypt=true;trustServerCertificate=true"

# SQL Server padrão
DATABASE_URL="sqlserver://localhost:1433;database=UniDB;user=sa;password=MinhaS3nha;encrypt=true;trustServerCertificate=true"

# Azure SQL Database
DATABASE_URL="sqlserver://meuservidor.database.windows.net:1433;database=UniDB;user=admin@meuservidor;password=MinhaS3nha;encrypt=true"
```

### 3️⃣ Inicie o Servidor

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Gerar cliente Prisma
npx prisma generate

# Iniciar servidor em modo desenvolvimento
npm run dev
```

✅ **Pronto!** O servidor estará rodando em `http://localhost:3000`

---

## 🧪 Testando a API

### Teste Rápido via cURL

```bash
# 1. Criar usuário
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"NomeUsuario":"João Silva","Senha":"senha123"}'

# 2. Listar usuários
curl http://localhost:3000/usuarios

# 3. Criar denúncia
curl -X POST http://localhost:3000/denuncias \
  -H "Content-Type: application/json" \
  -d '{"IdUsuario":1,"Nome":"Bug encontrado","Descricao":"Descrição do bug"}'

# 4. Listar denúncias
curl http://localhost:3000/denuncias

# 5. Criar aviso
curl -X POST http://localhost:3000/avisos \
  -H "Content-Type: application/json" \
  -d '{"IdUsuario":1,"Nome":"Manutenção","Descricao":"Sistema em manutenção"}'

# 6. Listar avisos
curl http://localhost:3000/avisos
```

### Teste via Navegador

Acesse: `http://localhost:3000`

Você verá: "API rodando - Sistema de Denúncias e Avisos"

---

## 📋 Estrutura de Requisições

### Criar Usuário
```http
POST /usuarios
Content-Type: application/json

{
  "NomeUsuario": "string",
  "Senha": "string"
}
```

### Criar Denúncia
```http
POST /denuncias
Content-Type: application/json

{
  "IdUsuario": number,
  "Nome": "string",
  "Descricao": "string"
}
```

### Criar Aviso
```http
POST /avisos
Content-Type: application/json

{
  "IdUsuario": number,
  "Nome": "string",
  "Descricao": "string"
}
```

---

## 🔧 Resolução de Problemas

### Erro: "Environment variable not found: DATABASE_URL"
**Solução:** Certifique-se que o arquivo `.env` existe na raiz e está preenchido

### Erro: "Authentication failed"
**Solução:** Verifique usuário e senha no `.env`. Para SQL Server local, o padrão é `user=sa`

### Erro: "Cannot find module @prisma/client"
**Solução:** 
```bash
npm install
npx prisma generate
```

### Erro: "Login failed for user"
**Solução:** 
1. Verifique se o SQL Server está rodando
2. Teste a conexão com SSMS
3. Confirme que a autenticação SQL Server está habilitada

### Erro: "Database 'UniDB' does not exist"
**Solução:** Execute o script `prisma/manual_migration.sql` no SQL Server

### Tabelas não aparecem
**Solução:**
```bash
# Puxar schema do banco
npx prisma db pull

# Gerar cliente
npx prisma generate
```

---

## 📊 Estrutura do Banco de Dados

```
UniDB
├── Usuarios
│   ├── IdUsuario (INT, PK, IDENTITY)
│   ├── Ativa (BIT, DEFAULT 1)
│   ├── NomeUsuario (NVARCHAR)
│   └── Senha (NVARCHAR)
│
├── Denuncias
│   ├── IdDenuncia (INT, PK, IDENTITY)
│   ├── IdUsuario (INT, FK → Usuarios)
│   ├── Nome (NVARCHAR)
│   ├── Descricao (NVARCHAR(MAX))
│   ├── Ativa (BIT, DEFAULT 1)
│   ├── Inclusao (DATETIME2, DEFAULT GETDATE())
│   └── Atualizacao (DATETIME2, DEFAULT GETDATE())
│
└── Avisos
    ├── IdAviso (INT, PK, IDENTITY)
    ├── IdUsuario (INT, FK → Usuarios)
    ├── Nome (NVARCHAR)
    ├── Descricao (NVARCHAR(MAX))
    ├── Ativa (BIT, DEFAULT 1)
    ├── Inclusao (DATETIME2, DEFAULT GETDATE())
    └── Atualizacao (DATETIME2, DEFAULT GETDATE())
```

---

## 🎯 Endpoints Completos

### Usuários
- `POST   /usuarios` - Criar usuário
- `GET    /usuarios` - Listar ativos
- `GET    /usuarios/:id` - Buscar por ID
- `PUT    /usuarios/:id` - Atualizar
- `PATCH  /usuarios/:id/desativar` - Desativar

### Denúncias
- `POST   /denuncias` - Criar denúncia
- `GET    /denuncias` - Listar ativas
- `GET    /denuncias/:id` - Buscar por ID
- `PUT    /denuncias/:id` - Atualizar
- `PATCH  /denuncias/:id/desativar` - Desativar

### Avisos
- `POST   /avisos` - Criar aviso
- `GET    /avisos` - Listar ativos
- `GET    /avisos/:id` - Buscar por ID
- `PUT    /avisos/:id` - Atualizar
- `PATCH  /avisos/:id/desativar` - Desativar

---

## 📦 Scripts Disponíveis

```bash
npm run dev          # Iniciar em modo desenvolvimento
npm run build        # Compilar TypeScript
npm start            # Iniciar em produção
npm run generate     # Gerar cliente Prisma
npm run migrate      # Executar migrations
npm run studio       # Abrir Prisma Studio
```

---

## ✅ Checklist Final

- [ ] SQL Server instalado e rodando
- [ ] Banco de dados UniDB criado
- [ ] Tabelas criadas (via script ou migrate)
- [ ] Arquivo `.env` configurado
- [ ] Dependências instaladas (`npm install`)
- [ ] Cliente Prisma gerado (`npx prisma generate`)
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Teste básico funcionando (criar usuário)

---

## 🎉 Sucesso!

Se tudo estiver funcionando, você verá:

```
Server funcionando na porta 3000
```

E ao acessar `http://localhost:3000`:

```
API rodando - Sistema de Denúncias e Avisos
```

**Documentação completa:** Veja os arquivos `README.md`, `TESTES.md` e `CORRECOES.md`

**Suporte:** Consulte a documentação do Prisma em https://www.prisma.io/docs
