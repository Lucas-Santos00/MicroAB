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
├─ controllers/                # Camada de entrada (HTTP)
│   └─ UserController.ts
│       • Recebe req/res do Fastify
│       • Chama Service
│       • Retorna JSON e status HTTP
│       • Ex: registerHandler(req, reply)
│
├─ services/                   # Regras de negócio
│   └─ UserService.ts
│       • Orquestra fluxo: chama Repository + Utils
│       • Aplica validações e regras de negócio
│       • Ex: register({ username, email, password })
│
├─ repositories/               # Acesso ao banco (Drizzle)
│   └─ UserRepository.ts
│       • Queries CRUD (select, insert, update, delete)
│       • Retorna dados crus (UserRecord | null)
│       • Não contém lógica de negócio
│
├─ entities/                   # Objetos de domínio
│   └─ User.ts
│       • Representa um usuário no domínio
│       • Métodos internos: changeUsername(), verifyPassword()
│       • Não toca DB nem HTTP
│
├─ utils/                      # Funções auxiliares (puras)
│   ├─ hash.ts
│   ├─ jwt.ts
│   └─ validation.ts
│       • Hash de senha, geração JWT, validação de dados
│
├─ db/                         # Configuração do banco (Drizzle ORM)
│   ├─ drizzle.ts
│   │     • Inicializa conexão com o banco
│   └─ schema.ts
│         • Define tabelas e modelos do banco
│
├─ config/                     # Configurações da aplicação (infra)
│   ├─ rate-limit-config.ts
│   │     • Opções de rate limit para rotas específicas
│   ├─ security.ts
│   │     • Configurações de segurança (CORS, cookies, headers)
│   └─ server.ts
│         • Variáveis de config global do servidor (timeout, logger, trust proxy)
│
├─ plugins/                    # Plugins Fastify (infra)
│   ├─ rate-limit.ts
│   │     • Registro do plugin de rate-limit (global: false)
│   ├─ error-handler.ts
│   │     • Handler de erros global (500)
│   └─ cookie.ts
│         • Registro do plugin de cookies
│
└─ types/                      # Tipos e DTOs compartilhados
    └─ User.ts
        • CreateUserDTO, UserResponseDTO, UserRecord
        • Tipos puros, sem métodos

```

---

### 📌 Observações

* Cada camada tem responsabilidade única (Clean Architecture).
* Controllers → Services → Repositories → Database.
* Entities e Utils são independentes de HTTP ou DB.
