# 🧪 Exemplos de Testes da API

Este arquivo contém exemplos de requisições para testar todos os endpoints da API.

## 📌 Base URL
```
http://localhost:3000
```

---

## 👤 USUÁRIOS

### 1. Criar Usuário (POST)
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "NomeUsuario": "João Silva",
    "Senha": "senha123"
  }'
```

**Resposta esperada (201):**
```json
{
  "mensagem": "Usuário criado com sucesso",
  "usuario": {
    "IdUsuario": 1,
    "NomeUsuario": "João Silva",
    "Ativa": true
  }
}
```

### 2. Criar Mais Usuários
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"NomeUsuario": "Maria Santos", "Senha": "maria456"}'

curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"NomeUsuario": "Pedro Oliveira", "Senha": "pedro789"}'
```

### 3. Listar Todos os Usuários Ativos (GET)
```bash
curl http://localhost:3000/usuarios
```

**Resposta esperada (200):**
```json
[
  {
    "IdUsuario": 1,
    "NomeUsuario": "João Silva",
    "Ativa": true
  },
  {
    "IdUsuario": 2,
    "NomeUsuario": "Maria Santos",
    "Ativa": true
  }
]
```

### 4. Buscar Usuário por ID (GET)
```bash
curl http://localhost:3000/usuarios/1
```

**Resposta esperada (200):**
```json
{
  "IdUsuario": 1,
  "NomeUsuario": "João Silva",
  "Ativa": true
}
```

### 5. Atualizar Usuário (PUT)
```bash
curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "NomeUsuario": "João Silva Atualizado",
    "Senha": "novaSenha123"
  }'
```

**Resposta esperada (200):**
```json
{
  "mensagem": "Usuário atualizado com sucesso",
  "usuario": {
    "IdUsuario": 1,
    "NomeUsuario": "João Silva Atualizado",
    "Ativa": true
  }
}
```

### 6. Desativar Usuário - Soft Delete (PATCH)
```bash
curl -X PATCH http://localhost:3000/usuarios/1/desativar
```

**Resposta esperada (200):**
```json
{
  "mensagem": "Usuário desativado com sucesso",
  "usuario": {
    "IdUsuario": 1,
    "NomeUsuario": "João Silva Atualizado",
    "Ativa": false
  }
}
```

---

## 📢 DENÚNCIAS

### 1. Criar Denúncia (POST)
```bash
curl -X POST http://localhost:3000/denuncias \
  -H "Content-Type: application/json" \
  -d '{
    "IdUsuario": 2,
    "Nome": "Bug crítico no sistema",
    "Descricao": "O sistema está travando ao tentar salvar dados com caracteres especiais. Erro ocorre consistentemente em todos os navegadores testados."
  }'
```

**Resposta esperada (201):**
```json
{
  "mensagem": "Denúncia criada com sucesso",
  "denuncia": {
    "IdDenuncia": 1,
    "IdUsuario": 2,
    "Nome": "Bug crítico no sistema",
    "Descricao": "O sistema está travando...",
    "Ativa": true,
    "Inclusao": "2025-11-06T10:30:00.000Z",
    "Atualizacao": "2025-11-06T10:30:00.000Z",
    "usuario": {
      "IdUsuario": 2,
      "NomeUsuario": "Maria Santos"
    }
  }
}
```

### 2. Criar Mais Denúncias
```bash
curl -X POST http://localhost:3000/denuncias \
  -H "Content-Type: application/json" \
  -d '{
    "IdUsuario": 2,
    "Nome": "Problema de segurança",
    "Descricao": "Identificado potencial vulnerabilidade na autenticação do sistema."
  }'

curl -X POST http://localhost:3000/denuncias \
  -H "Content-Type: application/json" \
  -d '{
    "IdUsuario": 3,
    "Nome": "Erro de integração",
    "Descricao": "A API externa não está respondendo corretamente em horários de pico."
  }'
```

### 3. Listar Todas as Denúncias Ativas (GET)
```bash
curl http://localhost:3000/denuncias
```

**Resposta esperada (200):**
```json
[
  {
    "IdDenuncia": 3,
    "IdUsuario": 3,
    "Nome": "Erro de integração",
    "Descricao": "A API externa não está respondendo...",
    "Ativa": true,
    "Inclusao": "2025-11-06T10:35:00.000Z",
    "Atualizacao": "2025-11-06T10:35:00.000Z",
    "usuario": {
      "IdUsuario": 3,
      "NomeUsuario": "Pedro Oliveira"
    }
  }
]
```

### 4. Buscar Denúncia por ID (GET)
```bash
curl http://localhost:3000/denuncias/1
```

### 5. Atualizar Denúncia (PUT)
```bash
curl -X PUT http://localhost:3000/denuncias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "Nome": "Bug crítico no sistema - RESOLVIDO",
    "Descricao": "O problema foi identificado e corrigido. Era um erro de encoding UTF-8."
  }'
```

### 6. Desativar Denúncia - Soft Delete (PATCH)
```bash
curl -X PATCH http://localhost:3000/denuncias/1/desativar
```

**Resposta esperada (200):**
```json
{
  "mensagem": "Denúncia desativada com sucesso",
  "denuncia": {
    "IdDenuncia": 1,
    "Ativa": false,
    ...
  }
}
```

---

## 📣 AVISOS

### 1. Criar Aviso (POST)
```bash
curl -X POST http://localhost:3000/avisos \
  -H "Content-Type: application/json" \
  -d '{
    "IdUsuario": 2,
    "Nome": "Manutenção programada",
    "Descricao": "O sistema ficará em manutenção no dia 15/11 das 22h às 02h para atualizações de segurança."
  }'
```

**Resposta esperada (201):**
```json
{
  "mensagem": "Aviso criado com sucesso",
  "aviso": {
    "IdAviso": 1,
    "IdUsuario": 2,
    "Nome": "Manutenção programada",
    "Descricao": "O sistema ficará em manutenção...",
    "Ativa": true,
    "Inclusao": "2025-11-06T11:00:00.000Z",
    "Atualizacao": "2025-11-06T11:00:00.000Z",
    "usuario": {
      "IdUsuario": 2,
      "NomeUsuario": "Maria Santos"
    }
  }
}
```

### 2. Criar Mais Avisos
```bash
curl -X POST http://localhost:3000/avisos \
  -H "Content-Type: application/json" \
  -d '{
    "IdUsuario": 3,
    "Nome": "Nova funcionalidade disponível",
    "Descricao": "Agora é possível exportar relatórios em formato PDF. Confira na área de relatórios."
  }'

curl -X POST http://localhost:3000/avisos \
  -H "Content-Type: application/json" \
  -d '{
    "IdUsuario": 2,
    "Nome": "Atualização de política de privacidade",
    "Descricao": "Nossa política de privacidade foi atualizada. Por favor, revise as alterações."
  }'
```

### 3. Listar Todos os Avisos Ativos (GET)
```bash
curl http://localhost:3000/avisos
```

**Resposta esperada (200):**
```json
[
  {
    "IdAviso": 3,
    "IdUsuario": 2,
    "Nome": "Atualização de política de privacidade",
    "Descricao": "Nossa política de privacidade foi atualizada...",
    "Ativa": true,
    "Inclusao": "2025-11-06T11:10:00.000Z",
    "Atualizacao": "2025-11-06T11:10:00.000Z",
    "usuario": {
      "IdUsuario": 2,
      "NomeUsuario": "Maria Santos"
    }
  }
]
```

### 4. Buscar Aviso por ID (GET)
```bash
curl http://localhost:3000/avisos/1
```

### 5. Atualizar Aviso (PUT)
```bash
curl -X PUT http://localhost:3000/avisos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "Nome": "Manutenção programada - ADIADA",
    "Descricao": "A manutenção foi adiada para o dia 20/11 no mesmo horário."
  }'
```

### 6. Desativar Aviso - Soft Delete (PATCH)
```bash
curl -X PATCH http://localhost:3000/avisos/1/desativar
```

---

## 🔍 Testes de Validação

### Teste 1: Criar denúncia com usuário inativo
```bash
# Primeiro desativar um usuário
curl -X PATCH http://localhost:3000/usuarios/1/desativar

# Tentar criar denúncia com esse usuário
curl -X POST http://localhost:3000/denuncias \
  -H "Content-Type: application/json" \
  -d '{
    "IdUsuario": 1,
    "Nome": "Teste",
    "Descricao": "Teste"
  }'
```

**Resposta esperada (404):**
```json
{
  "erro": "Usuário não encontrado ou inativo"
}
```

### Teste 2: Criar usuário sem dados obrigatórios
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "NomeUsuario": "Teste"
  }'
```

**Resposta esperada (400):**
```json
{
  "erro": "NomeUsuario e Senha são obrigatórios"
}
```

### Teste 3: Buscar registro inexistente
```bash
curl http://localhost:3000/denuncias/999
```

**Resposta esperada (404):**
```json
{
  "erro": "Denúncia não encontrada"
}
```

---

## 🧪 Script de Teste Completo (Bash)

```bash
#!/bin/bash

echo "=== Testando API de Denúncias e Avisos ==="
echo ""

echo "1. Criando usuários..."
curl -X POST http://localhost:3000/usuarios -H "Content-Type: application/json" -d '{"NomeUsuario":"João","Senha":"123"}'
echo ""
curl -X POST http://localhost:3000/usuarios -H "Content-Type: application/json" -d '{"NomeUsuario":"Maria","Senha":"456"}'
echo ""

echo "2. Listando usuários..."
curl http://localhost:3000/usuarios
echo ""

echo "3. Criando denúncia..."
curl -X POST http://localhost:3000/denuncias -H "Content-Type: application/json" -d '{"IdUsuario":1,"Nome":"Bug","Descricao":"Teste"}'
echo ""

echo "4. Criando aviso..."
curl -X POST http://localhost:3000/avisos -H "Content-Type: application/json" -d '{"IdUsuario":1,"Nome":"Aviso","Descricao":"Teste"}'
echo ""

echo "5. Listando denúncias..."
curl http://localhost:3000/denuncias
echo ""

echo "6. Listando avisos..."
curl http://localhost:3000/avisos
echo ""

echo "=== Testes concluídos ==="
```

Salve como `test-api.sh` e execute: `bash test-api.sh`

---

## 📦 Testando com Postman ou Insomnia

Importe esta coleção JSON para Postman/Insomnia:

```json
{
  "name": "Sistema Denúncias e Avisos",
  "requests": [
    {
      "name": "Criar Usuário",
      "method": "POST",
      "url": "http://localhost:3000/usuarios",
      "headers": [{"key": "Content-Type", "value": "application/json"}],
      "body": {"NomeUsuario": "Teste", "Senha": "123"}
    },
    {
      "name": "Listar Usuários",
      "method": "GET",
      "url": "http://localhost:3000/usuarios"
    }
  ]
}
```
