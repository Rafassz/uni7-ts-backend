# 🚀 Sistema de Denúncias e Avisos - API

API REST completa para gerenciamento de usuários, denúncias e avisos com sistema de soft delete (exclusão lógica).

**🏗️ Arquitetura:** Desenvolvida seguindo os **princípios SOLID** com **arquitetura modular por domínio** - cada entidade possui seu próprio módulo completo e independente.

## 📖 Documentação Rápida

- **[START.md](START.md)** → Guia de instalação e configuração passo a passo
- **[TESTES.md](TESTES.md)** → Exemplos de requisições para testar todos os endpoints

## ⚡ Início Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env com credenciais do SQL Server
# DATABASE_URL="sqlserver://localhost:1433;database=UniDB;user=sa;password=SUA_SENHA;..."

# 3. Executar o script prisma/manual_migration.sql no SQL Server
# OU rodar: npx prisma migrate dev

# 4. Gerar cliente Prisma
npx prisma generate

# 5. Iniciar servidor
npm run dev
```

Acesse: `http://localhost:3000`

## 📋 Estrutura do Banco de Dados

### Tabelas

#### 1. Usuarios
- `IdUsuario` (INT, PK, Auto-increment)
- `Ativa` (INT, default: 1)
- `NomeUsuario` (STRING)
- `Senha` (STRING)

#### 2. Denuncias
- `IdDenuncia` (INT, PK, Auto-increment)
- `IdUsuario` (INT, FK → Usuarios)
- `Nome` (STRING)
- `Descricao` (TEXT)
- `Ativa` (INT, default: 1)
- `Inclusao` (DATETIME, auto)
- `Atualizacao` (DATETIME, auto)

#### 3. Avisos
- `IdAviso` (INT, PK, Auto-increment)
- `IdUsuario` (INT, FK → Usuarios)
- `Nome` (STRING)
- `Descricao` (TEXT)
- `Ativa` (INT, default: 1)
- `Inclusao` (DATETIME, auto)
- `Atualizacao` (DATETIME, auto)

## 🚀 Configuração e Instalação

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados

Edite o arquivo `.env` com suas credenciais do SQL Server:

```env
DATABASE_URL="sqlserver://localhost:1433;database=UniDB;user=sa;password=SuaSenha;encrypt=true;trustServerCertificate=true"
PORT=3000
```

### 3. Executar migrations
```bash
npx prisma migrate dev
```

### 4. Gerar cliente Prisma
```bash
npx prisma generate
```

### 5. Iniciar servidor
```bash
npm run dev
```

## 📚 Endpoints da API

### 👤 Usuários (`/usuarios`)

#### Create - Criar usuário
```http
POST /usuarios
Content-Type: application/json

{
  "NomeUsuario": "João Silva",
  "Senha": "senha123"
}
```

#### GetAll - Listar usuários ativos
```http
GET /usuarios
```

#### GetById - Buscar usuário específico
```http
GET /usuarios/:id
```

#### Update - Atualizar usuário
```http
PUT /usuarios/:id
Content-Type: application/json

{
  "NomeUsuario": "João Silva Atualizado",
  "Senha": "novaSenha123"
}
```

#### UpdateAtiva - Desativar usuário (soft delete)
```http
PATCH /usuarios/:id/desativar
```

---

### 📢 Denúncias (`/denuncias`)

#### Create - Criar denúncia
```http
POST /denuncias
Content-Type: application/json

{
  "IdUsuario": 1,
  "Nome": "Problema no sistema",
  "Descricao": "Descrição detalhada da denúncia"
}
```

#### GetAll - Listar denúncias ativas
```http
GET /denuncias
```

#### GetById - Buscar denúncia específica
```http
GET /denuncias/:id
```

#### Update - Atualizar denúncia
```http
PUT /denuncias/:id
Content-Type: application/json

{
  "Nome": "Problema no sistema - Atualizado",
  "Descricao": "Nova descrição"
}
```

#### UpdateAtiva - Desativar denúncia (soft delete)
```http
PATCH /denuncias/:id/desativar
```

---

### 📣 Avisos (`/avisos`)

#### Create - Criar aviso
```http
POST /avisos
Content-Type: application/json

{
  "IdUsuario": 1,
  "Nome": "Manutenção programada",
  "Descricao": "Descrição detalhada do aviso"
}
```

#### GetAll - Listar avisos ativos
```http
GET /avisos
```

#### GetById - Buscar aviso específico
```http
GET /avisos/:id
```

#### Update - Atualizar aviso
```http
PUT /avisos/:id
Content-Type: application/json

{
  "Nome": "Manutenção programada - Atualizado",
  "Descricao": "Nova descrição"
}
```

#### UpdateAtiva - Desativar aviso (soft delete)
```http
PATCH /avisos/:id/desativar
```

## 🔒 Regras de Negócio

1. **Soft Delete**: Nenhum registro é deletado fisicamente do banco de dados
2. **Campo Ativa**: Usado para marcar registros como ativos (1) ou inativos (0)
3. **Filtro de Listagem**: GetAll retorna apenas registros com `Ativa = 1`
4. **Relacionamentos**: Denúncias e Avisos estão relacionados com Usuários
5. **Validação**: Ao criar denúncia ou aviso, verifica-se se o usuário existe e está ativo
6. **Timestamps**: Inclusao e Atualizacao são gerenciados automaticamente pelo Prisma

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **SQL Server** - Banco de dados
- **CORS** - Habilitado para requisições cross-origin

## 🏗️ Arquitetura SOLID

Este projeto segue os **princípios SOLID** com uma arquitetura em camadas:

```
📦 Camadas da Aplicação
│
├── 🎨 Controllers (Presentation)
│   └── Responsabilidade: Lidar com requisições HTTP
│
├── 💼 Services (Business Logic)
│   └── Responsabilidade: Regras de negócio e validações
│
├── 🗄️ Repositories (Data Access)
│   └── Responsabilidade: Acesso ao banco de dados
│
├── 📋 Interfaces (Contracts)
│   └── Responsabilidade: Contratos e abstrações
│
└── 📦 Types/DTOs (Data Transfer Objects)
    └── Responsabilidade: Definição de estruturas de dados
```

**Benefícios:**
- ✅ Código mais testável e manutenível
- ✅ Separação clara de responsabilidades
- ✅ Facilita extensão sem modificação
- ✅ Dependency Injection implementada

**Documentação completa:** Veja [SOLID.md](SOLID.md) e [DIAGRAMAS.md](DIAGRAMAS.md)

## 📁 Estrutura do Projeto

```
uni7-ts/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Histórico de migrations
├── src/
│   ├── controller/            # 🎨 Camada de apresentação (HTTP)
│   │   ├── userController.ts
│   │   ├── denunciaController.ts
│   │   └── avisoController.ts
│   ├── services/              # 💼 Camada de negócio
│   │   ├── UsuarioService.ts
│   │   ├── DenunciaService.ts
│   │   └── AvisoService.ts
│   ├── repositories/          # 🗄️ Camada de dados
│   │   ├── UsuarioRepository.ts
│   │   ├── DenunciaRepository.ts
│   │   └── AvisoRepository.ts
│   ├── interfaces/            # 📋 Contratos e abstrações
│   │   ├── IRepository.ts
│   │   ├── IService.ts
│   │   └── ...
│   ├── types/                 # 📦 DTOs
│   │   ├── usuario.types.ts
│   │   ├── denuncia.types.ts
│   │   └── aviso.types.ts
│   ├── database/
│   │   └── prismaClient.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   ├── denunciaRoutes.ts
│   │   └── avisoRoutes.ts
│   └── index.ts               # Arquivo principal
├── .env                       # Variáveis de ambiente (não commitado)
├── .env.example               # Exemplo de configuração
├── package.json
└── tsconfig.json
```

## 📝 Exemplos de Uso

### Exemplo 1: Criar usuário e denúncia

```bash
# 1. Criar usuário
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"NomeUsuario":"Maria","Senha":"senha123"}'

# 2. Criar denúncia
curl -X POST http://localhost:3000/denuncias \
  -H "Content-Type: application/json" \
  -d '{"IdUsuario":1,"Nome":"Bug crítico","Descricao":"Sistema travando"}'
```

### Exemplo 2: Listar e desativar

```bash
# Listar todas as denúncias ativas
curl http://localhost:3000/denuncias

# Desativar denúncia
curl -X PATCH http://localhost:3000/denuncias/1/desativar
```

## 🔍 Comandos Úteis do Prisma

```bash
# Visualizar banco de dados no Prisma Studio
npx prisma studio

# Resetar banco de dados (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Ver status das migrations
npx prisma migrate status

# Aplicar migrations em produção
npx prisma migrate deploy
```

## 📞 Suporte

Para mais informações sobre o projeto, consulte a documentação do Prisma: https://www.prisma.io/docs
