# 🚀 Sistema de Denúncias e Avisos - API

API REST completa para gerenciamento de usuários, denúncias e avisos com sistema de soft delete (exclusão lógica).

**🏗️ Arquitetura:** Desenvolvida seguindo os **princípios SOLID** com **arquitetura modular baseada em operações** - cada entidade possui seus próprios módulos organizados por funcionalidade (create, update, getAll, getById, deactivate).

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

# 4. Gerar cliente Prisma
npx prisma generate

# 5. Compilar TypeScript
npm run build

# 6. Iniciar servidor
npm run dev
```

Acesse: `http://localhost:3000`

## 📋 Estrutura do Banco de Dados

### Tabelas

#### 1. Usuarios
- `IdUsuario` (INT, PK, Auto-increment)
- `NomeUsuario` (VARCHAR(255))
- `Senha` (VARCHAR(255))
- `Ativa` (BIT, default: 1)
- `Inclusao` (DATETIME2, auto)
- `Atualizacao` (DATETIME2, auto)

#### 2. Denuncias
- `IdDenuncia` (INT, PK, Auto-increment)
- `IdUsuario` (INT, FK → Usuarios)
- `Nome` (VARCHAR(255))
- `Descricao` (TEXT)
- `Ativa` (BIT, default: 1)
- `Inclusao` (DATETIME2, auto)
- `Atualizacao` (DATETIME2, auto)

#### 3. Avisos
- `IdAviso` (INT, PK, Auto-increment)
- `IdUsuario` (INT, FK → Usuarios)
- `Nome` (VARCHAR(255))
- `Descricao` (TEXT)
- `Ativa` (BIT, default: 1)
- `Inclusao` (DATETIME2, auto)
- `Atualizacao` (DATETIME2, auto)

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

**Base URL:** `http://localhost:3000/uni7`

### 👤 Usuários (`/uni7/usuarios`)

#### Create - Criar usuário
```http
POST /uni7/usuarios
Content-Type: application/json

{
  "NomeUsuario": "João Silva",
  "Senha": "senha123"
}
```

#### GetAll - Listar usuários ativos
```http
GET /uni7/usuarios
```

#### GetById - Buscar usuário específico
```http
GET /uni7/usuarios/:id
```

#### Update - Atualizar usuário
```http
PUT /uni7/usuarios/:id
Content-Type: application/json

{
  "NomeUsuario": "João Silva Atualizado",
  "Senha": "novaSenha123"
}
```

#### Deactivate - Desativar usuário (soft delete)
```http
PATCH /uni7/usuarios/:id/desativar
```

---

### 📢 Denúncias (`/uni7/denuncias`)

#### Create - Criar denúncia
```http
POST /uni7/denuncias
Content-Type: application/json

{
  "IdUsuario": 1,
  "Nome": "Problema no sistema",
  "Descricao": "Descrição detalhada da denúncia"
}
```

#### GetAll - Listar denúncias ativas
```http
GET /uni7/denuncias
```

#### GetById - Buscar denúncia específica
```http
GET /uni7/denuncias/:id
```

#### Update - Atualizar denúncia
```http
PUT /uni7/denuncias/:id
Content-Type: application/json

{
  "Nome": "Problema no sistema - Atualizado",
  "Descricao": "Nova descrição"
}
```

#### Deactivate - Desativar denúncia (soft delete)
```http
PATCH /uni7/denuncias/:id/desativar
```

---

### 📣 Avisos (`/uni7/avisos`)

#### Create - Criar aviso
```http
POST /uni7/avisos
Content-Type: application/json

{
  "IdUsuario": 1,
  "Nome": "Manutenção programada",
  "Descricao": "Descrição detalhada do aviso"
}
```

#### GetAll - Listar avisos ativos
```http
GET /uni7/avisos
```

#### GetById - Buscar aviso específico
```http
GET /uni7/avisos/:id
```

#### Update - Atualizar aviso
```http
PUT /uni7/avisos/:id
Content-Type: application/json

{
  "Nome": "Manutenção programada - Atualizado",
  "Descricao": "Nova descrição"
}
```

#### Deactivate - Desativar aviso (soft delete)
```http
PATCH /uni7/avisos/:id/desativar
```

## 🔒 Regras de Negócio

1. **Soft Delete**: Nenhum registro é deletado fisicamente do banco de dados
2. **Campo Ativa**: Tipo BIT, usado para marcar registros como ativos (1) ou inativos (0)
3. **Filtro de Listagem**: GetAll retorna apenas registros com `Ativa = 1`
4. **Relacionamentos**: Denúncias e Avisos estão relacionados com Usuários via FK
5. **Validação**: Ao criar denúncia ou aviso, verifica-se se o usuário existe e está ativo
6. **Timestamps**: Inclusao e Atualizacao são gerenciados automaticamente pelo Prisma
7. **Todas as tabelas** possuem os campos Ativa, Inclusao e Atualizacao

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **SQL Server** - Banco de dados
- **CORS** - Habilitado para requisições cross-origin

## 🏗️ Arquitetura SOLID com Operações

Este projeto segue os **princípios SOLID** com uma arquitetura baseada em **operações** organizadas por domínio:

```
📦 Estrutura por Domínio e Operação
│
├── 📁 usuario/
│   ├── 📁 controller/
│   │   ├── 📁 create/
│   │   │   ├── create.ts (Controller)
│   │   │   ├── useCase.ts (Business Logic)
│   │   │   └── DTO/ (Request/Response)
│   │   ├── 📁 update/
│   │   ├── 📁 getAll/
│   │   ├── 📁 getById/
│   │   └── 📁 deactivate/
│   ├── � repository/
│   ├── 📁 interfaces/
│   ├── 📁 model/
│   └── 📁 routes/
│
├── 📁 denuncia/ (mesma estrutura)
└── 📁 aviso/ (mesma estrutura)
```

**Camadas:**
- 🎨 **Controller** - Recebe requisições HTTP e chama o UseCase
- 💼 **UseCase** - Contém a lógica de negócio específica da operação
- 🗄️ **Repository** - Acesso ao banco de dados
- 📋 **Interfaces** - Contratos para Repository e Service
- 📦 **DTO** - Objetos de transferência de dados (IRequest/IResponse)

**Benefícios:**
- ✅ Código modular e altamente organizado
- ✅ Cada operação é independente e testável
- ✅ Separação clara de responsabilidades
- ✅ Fácil manutenção e extensão
- ✅ UseCases co-localizados com seus controllers

## 📁 Estrutura do Projeto

```
uni7-ts/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── manual_migration.sql   # Script SQL para criação do banco
├── src/
│   ├── usuario/               # 📦 Módulo Usuario
│   │   ├── controller/
│   │   │   ├── create/
│   │   │   │   ├── create.ts           # CreateUsuarioController
│   │   │   │   ├── useCase.ts          # CreateUsuarioUseCase
│   │   │   │   ├── index.ts            # Exports
│   │   │   │   └── DTO/
│   │   │   │       ├── IRequest.ts     # Interface de entrada
│   │   │   │       └── IResponse.ts    # Interface de saída
│   │   │   ├── update/                 # Mesma estrutura
│   │   │   ├── getAll/
│   │   │   ├── getById/
│   │   │   └── deactivate/
│   │   ├── repository/
│   │   │   └── UsuarioRepository.ts
│   │   ├── interfaces/
│   │   │   └── IUsuarioRepository.ts
│   │   ├── model/
│   │   │   └── usuario.ts
│   │   └── routes/
│   │       └── usuarioRoutes.ts
│   ├── denuncia/              # 📦 Módulo Denuncia (mesma estrutura)
│   ├── aviso/                 # 📦 Módulo Aviso (mesma estrutura)
│   ├── database/
│   │   └── prismaClient.ts
│   └── index.ts               # Servidor principal
├── dist/                      # Código compilado
├── .env                       # Variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
├── START.md
└── TESTES.md
```

## 📝 Exemplos de Uso

### Exemplo 1: Criar usuário e denúncia

```bash
# 1. Criar usuário
curl -X POST http://localhost:3000/uni7/usuarios \
  -H "Content-Type: application/json" \
  -d '{"NomeUsuario":"Maria","Senha":"senha123"}'

# 2. Criar denúncia
curl -X POST http://localhost:3000/uni7/denuncias \
  -H "Content-Type: application/json" \
  -d '{"IdUsuario":1,"Nome":"Bug crítico","Descricao":"Sistema travando"}'
```

### Exemplo 2: Listar e desativar

```bash
# Listar todas as denúncias ativas
curl http://localhost:3000/uni7/denuncias

# Desativar denúncia
curl -X PATCH http://localhost:3000/uni7/denuncias/1/desativar
```

## 🔍 Comandos Úteis

```bash
# Visualizar banco de dados no Prisma Studio
npx prisma studio

# Gerar cliente Prisma após alterações no schema
npx prisma generate

# Compilar TypeScript
npm run build

# Iniciar servidor de desenvolvimento
npm run dev

# Verificar erros de TypeScript
npx tsc --noEmit
```

## 📦 Scripts Disponíveis

```json
{
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

## 📞 Suporte

Para mais informações sobre o projeto, consulte a documentação do Prisma: https://www.prisma.io/docs
