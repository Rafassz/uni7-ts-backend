# 📚 Documentação Swagger - Sistema de Denúncias e Avisos

## 🚀 Acessando a Documentação

Após iniciar o servidor, a documentação interativa do Swagger estará disponível em:

```
http://localhost:3000/api-docs
```

### Endpoint JSON

Para acessar a especificação OpenAPI em formato JSON:

```
http://localhost:3000/api-docs.json
```

## 📖 Sobre o Swagger

O Swagger fornece uma interface interativa onde você pode:

- ✅ **Visualizar todos os endpoints** da API
- ✅ **Testar requisições** diretamente do navegador
- ✅ **Ver exemplos** de request e response
- ✅ **Entender os schemas** de dados
- ✅ **Validar respostas** de erro e sucesso

## 🎯 Funcionalidades Documentadas

### 👤 Usuários (`/uni7/usuarios`)

- **POST** `/uni7/usuarios` - Criar novo usuário
- **GET** `/uni7/usuarios` - Listar todos os usuários ativos
- **GET** `/uni7/usuarios/{id}` - Buscar usuário por ID
- **PUT** `/uni7/usuarios/{id}` - Atualizar usuário
- **PATCH** `/uni7/usuarios/{id}/desativar` - Desativar usuário (soft delete)

### 📢 Denúncias (`/uni7/denuncias`)

- **POST** `/uni7/denuncias` - Criar nova denúncia
- **GET** `/uni7/denuncias` - Listar todas as denúncias ativas
- **GET** `/uni7/denuncias/{id}` - Buscar denúncia por ID
- **PUT** `/uni7/denuncias/{id}` - Atualizar denúncia
- **PATCH** `/uni7/denuncias/{id}/desativar` - Desativar denúncia (soft delete)

### 📣 Avisos (`/uni7/avisos`)

- **POST** `/uni7/avisos` - Criar novo aviso
- **GET** `/uni7/avisos` - Listar todos os avisos ativos
- **GET** `/uni7/avisos/{id}` - Buscar aviso por ID
- **PUT** `/uni7/avisos/{id}` - Atualizar aviso
- **PATCH** `/uni7/avisos/{id}/desativar` - Desativar aviso (soft delete)

## 🔧 Como Usar

### 1. Iniciar o Servidor

```bash
npm run dev
```

### 2. Acessar a Documentação

Abra seu navegador e navegue até:

```
http://localhost:3000/api-docs
```

### 3. Testar Endpoints

1. Escolha um endpoint na lista
2. Clique em "Try it out"
3. Preencha os parâmetros necessários
4. Clique em "Execute"
5. Veja a resposta da API

## 📝 Schemas de Dados

### Usuario

```json
{
  "IdUsuario": 1,
  "NomeUsuario": "João Silva",
  "Ativa": true,
  "Inclusao": "2025-11-10T10:00:00Z",
  "Atualizacao": "2025-11-10T10:00:00Z"
}
```

### Denuncia

```json
{
  "IdDenuncia": 1,
  "IdUsuario": 1,
  "Nome": "Bug crítico no sistema",
  "Descricao": "Descrição detalhada do problema",
  "Ativa": true,
  "Inclusao": "2025-11-10T10:00:00Z",
  "Atualizacao": "2025-11-10T10:00:00Z",
  "usuario": {
    "IdUsuario": 1,
    "NomeUsuario": "João Silva"
  }
}
```

### Aviso

```json
{
  "IdAviso": 1,
  "IdUsuario": 1,
  "Nome": "Manutenção programada",
  "Descricao": "Sistema ficará offline das 22h às 02h",
  "Ativa": true,
  "Inclusao": "2025-11-10T10:00:00Z",
  "Atualizacao": "2025-11-10T10:00:00Z",
  "usuario": {
    "IdUsuario": 1,
    "NomeUsuario": "João Silva"
  }
}
```

## 🎨 Personalização

A configuração do Swagger está localizada em:

```
src/swagger.ts
```

Você pode personalizar:

- Informações da API (título, descrição, versão)
- Servidores disponíveis
- Tags e agrupamentos
- Schemas de dados
- Exemplos de requisições

## 📦 Dependências Utilizadas

- `swagger-ui-express` - Interface visual do Swagger
- `swagger-jsdoc` - Geração de documentação a partir de JSDoc
- `@types/swagger-ui-express` - Tipos TypeScript para Swagger UI
- `@types/swagger-jsdoc` - Tipos TypeScript para Swagger JSDoc

## 🔗 Links Úteis

- [Swagger Official Docs](https://swagger.io/docs/)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)

## 💡 Dicas

1. **Use o "Try it out"** para testar rapidamente seus endpoints
2. **Consulte os schemas** para entender a estrutura dos dados
3. **Veja os exemplos** para saber como montar as requisições
4. **Verifique os códigos de status** para entender os diferentes retornos

## 🚨 Importante

A documentação é gerada automaticamente a partir dos comentários JSDoc nos arquivos de rotas. Para adicionar novos endpoints à documentação, basta adicionar os comentários `@swagger` nas rotas correspondentes.
