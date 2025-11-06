# MicroAB

Aplicação Node.js/TypeScript com Fastify, Drizzle ORM e Docker.

---

## 🚀 Rodando a aplicação

Certifique-se de criar um arquivo `.env` com as seguintes variáveis:

```
SECRET_KEY
DATABASE_URL
REDIS_HOST
REDIS_USERNAME
REDIS_PASSWORD
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
PORT
```

Para rodar com Docker:

```bash
docker run --rm -it \
 -p 3001:3001 \
 -v $(pwd):/app \
 -w /app \
 microab \
 npx tsx watch src/server.ts
```

---

## 📁 Estrutura do projeto

```
src/
├─ controllers/      # Camada de entrada (HTTP)
│   └─ UserController.ts
│       • Recebe req/res do Fastify
│       • Chama Service
│       • Retorna JSON e status HTTP
│       • Ex: registerHandler(req, reply)
│
├─ services/         # Regras de negócio
│   └─ UserService.ts
│       • Orquestra fluxo: chama Repository + Utils
│       • Aplica validações e regras de negócio
│       • Ex: register({ username, email, password })
│
├─ repositories/     # Acesso ao banco (Drizzle)
│   └─ UserRepository.ts
│       • Queries CRUD (select, insert, update, delete)
│       • Retorna dados crus (UserRecord | null)
│       • Não contém lógica de negócio
│       • Ex: findByEmail(email), createUser(...)
│
├─ entities/         # Objetos de domínio (User, Product, Order)
│   └─ User.ts
│       • Representa um usuário real do sistema
│       • Pode ter métodos internos: changeUsername, verifyPassword
│       • Não toca DB nem HTTP
│       • Ex: class User { id, username, email, passwordHash }
│
├─ utils/            # Funções auxiliares
│   └─ hash.ts, jwt.ts, validation.ts
│       • Hash de senha, validação de email, geração JWT
│       • Funções puras reutilizáveis
│
├─ db/               # Configuração do Drizzle + schema
│   ├─ drizzle.ts
│   │     • Cria conexão com PostgreSQL ou outro DB
│   └─ schema.ts
│         • Define tabelas usando Drizzle ORM
│         • Ex: users, products
│
└─ types/            # Tipos TypeScript compartilhados
    └─ User.ts
        • DTOs, tipagem de requisição/response
        • Ex: CreateUserDTO, UserResponseDTO, UserRecord
        • Só define estrutura de dados, sem métodos
```

---

### 📌 Observações

* Cada camada tem responsabilidade única (Clean Architecture).
* Controllers → Services → Repositories → Database.
* Entities e Utils são independentes de HTTP ou DB.

---

Se quiser, posso fazer uma **versão visual ainda mais estilizada**, com badges, instruções de setup e dicas de desenvolvimento, que deixa o README pronto pra colocar direto no GitHub e parecer profissional.

Quer que eu faça?
