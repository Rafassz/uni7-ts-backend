# 🎭 Sistema de Roles e Permissões - CondoManager

## 📊 Hierarquia de Permissões

```
👑 Síndico (Nível 4)
   ↓
🔧 Administrador (Nível 3)
   ↓
🚪 Porteiro (Nível 2)
   ↓
🏠 Morador (Nível 1)
```

---

## 🔑 Permissões por Role

### 👑 **Síndico** (Acesso Total)
- ✅ **Denúncias**: Criar, visualizar, editar, excluir, alterar status
- ✅ **Avisos**: Criar, visualizar, editar, excluir
- ✅ **Usuários**: Criar, visualizar, editar, excluir, alterar roles
- ✅ **Categorias**: Criar, visualizar, editar
- ✅ **Dashboard**: Acesso completo a todas as estatísticas
- ✅ **Comentários**: Criar, visualizar, editar próprios, excluir qualquer um
- ✅ **Notificações**: Visualizar e gerenciar todas

### 🔧 **Administrador** (Gerenciamento)
- ✅ **Denúncias**: Criar, visualizar, editar, excluir, alterar status
- ✅ **Avisos**: Criar, visualizar, editar, excluir
- ✅ **Usuários**: Criar, visualizar, editar, excluir (exceto Síndico)
- ✅ **Categorias**: Visualizar
- ✅ **Dashboard**: Acesso completo
- ✅ **Comentários**: Criar, visualizar, editar próprios, excluir próprios
- ✅ **Notificações**: Visualizar próprias

### 🚪 **Porteiro** (Operacional)
- ✅ **Denúncias**: Visualizar todas, alterar status
- ✅ **Avisos**: Criar, visualizar, editar próprios, excluir próprios
- ❌ **Usuários**: Apenas visualizar próprio perfil
- ✅ **Categorias**: Visualizar
- ✅ **Dashboard**: Acesso limitado (apenas estatísticas gerais)
- ✅ **Comentários**: Criar, visualizar, editar próprios
- ✅ **Notificações**: Visualizar próprias

### 🏠 **Morador** (Básico)
- ✅ **Denúncias**: Criar, visualizar próprias, editar próprias (antes de análise)
- ✅ **Avisos**: Visualizar apenas
- ❌ **Usuários**: Apenas visualizar próprio perfil
- ✅ **Categorias**: Visualizar
- ✅ **Dashboard**: Acesso limitado (apenas próprias denúncias)
- ✅ **Comentários**: Criar em próprias denúncias, visualizar
- ✅ **Notificações**: Visualizar próprias

---

## 🛡️ Middlewares Implementados

### 1. `authMiddleware`
Verifica se o usuário está autenticado via token JWT.
```typescript
// Uso: Todas as rotas protegidas
router.post("/denuncias", authMiddleware, ...)
```

### 2. `requireRole(...roles)`
Permite acesso apenas para roles específicos.
```typescript
// Exemplo: Apenas Síndico e Administrador
router.post("/usuarios", authMiddleware, requireRole('Síndico', 'Administrador'), ...)
```

### 3. `requireMinRole(minRole)`
Verifica se usuário tem nível mínimo de permissão.
```typescript
// Exemplo: Porteiro ou superior
router.put("/denuncias/:id", authMiddleware, requireMinRole('Porteiro'), ...)
```

### 4. `canModifyDenunciaStatus`
Verifica se pode alterar status de denúncias (Porteiro+).
```typescript
router.put("/denuncias/:id/status", authMiddleware, canModifyDenunciaStatus, ...)
```

### 5. `canCreateAviso`
Verifica se pode criar avisos (Porteiro+).
```typescript
router.post("/avisos", authMiddleware, canCreateAviso, ...)
```

### 6. `canManageUsers`
Verifica se pode gerenciar usuários (Administrador+).
```typescript
router.post("/usuarios", authMiddleware, canManageUsers, ...)
```

---

## 📋 Rotas Protegidas

### **Denúncias**
| Método | Rota | Permissão |
|--------|------|-----------|
| POST | `/denuncias` | Qualquer autenticado |
| GET | `/denuncias` | Qualquer autenticado |
| GET | `/denuncias/:id` | Qualquer autenticado |
| PUT | `/denuncias/:id` | Porteiro+ |
| PATCH | `/denuncias/:id/desativar` | Porteiro+ |

### **Avisos**
| Método | Rota | Permissão |
|--------|------|-----------|
| POST | `/avisos` | Porteiro+ |
| GET | `/avisos` | Qualquer autenticado |
| GET | `/avisos/:id` | Qualquer autenticado |
| PUT | `/avisos/:id` | Porteiro+ |
| PATCH | `/avisos/:id/desativar` | Porteiro+ |

### **Usuários**
| Método | Rota | Permissão |
|--------|------|-----------|
| POST | `/usuarios` | Administrador+ |
| GET | `/usuarios` | Administrador+ |
| GET | `/usuarios/:id` | Próprio usuário ou Admin+ |
| PUT | `/usuarios/:id` | Administrador+ |
| PATCH | `/usuarios/:id/desativar` | Administrador+ |
| POST | `/usuarios/login` | Público |

---

## 🧪 Como Testar

### 1. **Login com diferentes roles**

```bash
# Síndico (acesso total)
POST /uni7/usuarios/login
{
  "NomeUsuario": "admin",
  "Senha": "admin123"
}
# Token contém: { id: 1, username: "admin", role: "Síndico" }

# Administrador
POST /uni7/usuarios/login
{
  "NomeUsuario": "maria.santos",
  "Senha": "senha123"
}

# Porteiro
POST /uni7/usuarios/login
{
  "NomeUsuario": "joao.silva",
  "Senha": "senha123"
}

# Morador
POST /uni7/usuarios/login
{
  "NomeUsuario": "carlos.pereira",
  "Senha": "senha123"
}
```

### 2. **Testar permissões**

```bash
# ❌ Morador tentando criar aviso (deve dar 403)
POST /uni7/avisos
Headers: { Authorization: "Bearer <token_morador>" }

# ✅ Porteiro criando aviso (deve funcionar)
POST /uni7/avisos
Headers: { Authorization: "Bearer <token_porteiro>" }

# ❌ Porteiro tentando criar usuário (deve dar 403)
POST /uni7/usuarios
Headers: { Authorization: "Bearer <token_porteiro>" }

# ✅ Administrador criando usuário (deve funcionar)
POST /uni7/usuarios
Headers: { Authorization: "Bearer <token_admin>" }
```

---

## 🎯 Respostas de Erro

### 401 - Não Autenticado
```json
{
  "erro": "Token não fornecido"
}
```

### 403 - Sem Permissão
```json
{
  "erro": "Acesso negado",
  "detalhes": "Apenas Porteiro, Administrador ou Síndico podem criar avisos",
  "seuNivel": "Morador"
}
```

---

## 📝 Usuários de Teste

| ID | Username | Senha | Role | Apartamento |
|----|----------|-------|------|-------------|
| 1 | admin | admin123 | 👑 Síndico | 101-A |
| 2 | maria.santos | senha123 | 🔧 Administrador | 102-A |
| 3 | joao.silva | senha123 | 🚪 Porteiro | Portaria |
| 4 | carlos.pereira | senha123 | 🏠 Morador | 201-B |
| 5 | ana.costa | senha123 | 🏠 Morador | 202-B |
| 6 | pedro.alves | senha123 | 🏠 Morador | 301-A |
| 7 | juliana.lima | senha123 | 🏠 Morador | 302-A |
| 8 | roberto.souza | senha123 | 🏠 Morador | 401-B |

---

## 🚀 Próximas Melhorias

- [ ] **Auditoria**: Log de todas as ações com role do usuário
- [ ] **Permissões customizadas**: Permitir override de permissões por usuário
- [ ] **Gestão de roles**: Interface para Síndico alterar roles
- [ ] **Notificações por role**: Avisos específicos para cada nível
- [ ] **Dashboard por role**: Estatísticas filtradas por permissão
