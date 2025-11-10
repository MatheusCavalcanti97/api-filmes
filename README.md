# 🎬 API REST de Filmes

Este projeto consiste em uma API REST desenvolvida com **Node.js** e **Express**, que permite o gerenciamento de filmes.
A API foi construída com foco em simplicidade, organização, testes automatizados e boas práticas de versionamento com Git.

---

## Estrutura do Projeto

```
api-filmes/
│── app.js               # Configuração principal do Express.
│── package.json         # Dependências e scripts.
│── README.md            # Documentação.
│
├── server/              # Inicialização do servidor.
│   └── server.js
│
├── routes/              # Definição das rotas da API.
│
├── models/              # Modelos do banco de dados.
│
├── config/              # Configurações de banco, dotenv etc.
│
├── __tests__/           # Testes automatizados com Jest + Supertest.
│
├── Dockerfile           # Configuração do container da API.
├── docker-compose.yml   # Orquestração da API e banco de dados.
│
├── eslint.config.cjs    # Configuração do ESLint
└── node_modules/
```

---

## 🚀 Como executar a API

### 1. Localmente (sem Docker)

#### Passo 1 — Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=usuario
DB_PASSWORD=senha123
DB_NAME=filmesdb
```

#### Passo 2 — Variáveis de ambiente para testes

Crie também um arquivo `.env.test` com o seguinte conteúdo:

```env
DB_NAME=filmes_db
DB_USER=filmes_user
DB_PASSWORD=filmes_pass123
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=test
```

> Isso garante que os testes rodem em um banco de dados isolado, sem afetar o ambiente de desenvolvimento.

#### Passo 3 — Instale as dependências

```bash
npm install
```

#### Passo 4 — Rodar o Linter

O projeto utiliza **ESLint** para manter o código padronizado:

```bash
npx eslint .
```

> Para corrigir problemas automaticamente:

```bash
npx eslint . --fix
```

#### Passo 5 — Inicie o servidor

```bash
npm start
```

#### Passo 6 — Testar localmente

Você pode testar os endpoints usando o **Postman**, **Insomnia** ou **curl**:

```bash
# Listar filmes
curl http://localhost:3000/api/filmes

# Cadastrar filme
curl -X POST http://localhost:3000/api/filmes \
  -H "Content-Type: application/json" \
  -d '{"titulo": "O Senhor dos Anéis", "ano": 2001}'

# Deletar um filme pelo id
curl -X DELETE http://localhost:3000/api/filmes/2
```

#### Passo 7 — Execute os testes

```bash
npm test
```

> O Jest vai utilizar o arquivo `.env.test` automaticamente se configurado com `NODE_ENV=test`.

---

### 2. Com Docker

#### Pré-requisitos

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

#### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (mesmo conteúdo da execução local):

```env
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=usuario
DB_PASSWORD=senha123
DB_NAME=filmesdb
```

#### Comandos Docker

* Build e start da aplicação:

```bash
docker-compose up --build
```

* Start em background:

```bash
docker-compose up -d
```

* Parar containers:

```bash
docker-compose down
```

* Ver logs da aplicação:

```bash
docker-compose logs -f api
```

#### Acessando o banco de dados

```bash
docker exec -it api-filmes-db psql -U usuario -d filmesdb
```

Dentro do console `psql`, exemplos de consultas SQL:

```sql
-- Listar todas as tabelas
\dt

-- Listar todos os filmes
SELECT * FROM filmes;

-- Inserir um filme
INSERT INTO filmes (titulo, ano) VALUES ('Interestelar', 2014);

-- Atualizar um filme
UPDATE filmes SET titulo='Matrix Reloaded' WHERE id=1;

-- Deletar um filme
DELETE FROM filmes WHERE id=2;
```

---

## Endpoints disponíveis

### ➤ GET — Listar filmes

**GET [http://localhost:3000/api/filmes](http://localhost:3000/api/filmes)**

Resposta esperada:

```json
[
  {
    "id": 1,
    "titulo": "Matrix",
    "ano": 1999
  }
]
```

### ➤ POST — Cadastrar filme

**POST [http://localhost:3000/api/filmes](http://localhost:3000/api/filmes)**

Corpo da requisição (JSON):

```json
{
  "titulo": "O Senhor dos Anéis",
  "ano": 2001
}
```

### ➤ DELETE — Remover filme

**DELETE [http://localhost:3000/api/filmes/:id](http://localhost:3000/api/filmes/:id)**

Exemplo de requisição:

```bash
curl -X DELETE http://localhost:3000/api/filmes/2
```

Resposta esperada:

```json
{
  "message": "Filme removido com sucesso"
}
```

---

## Testes Automatizados

Os testes foram implementados utilizando **Jest** e **Supertest**.
Exemplo em `__tests__/routes.test.js`:

```js
it('GET /api/filmes deve retornar status 200', async () => {
  const res = await request(app).get('/api/filmes');
  expect(res.status).toBe(200);
});
```

---

## Workflow Git

O projeto utiliza o **GitHub Flow**, que organiza o desenvolvimento em branches de funcionalidades e promove integração contínua com validação automatizada via **GitHub Actions**.

### Motivo da escolha

O GitHub Flow é simples e direto, ideal para projetos individuais ou pequenos times. Permite que cada feature seja desenvolvida em uma branch isolada e integrada à `main` de forma segura.

### Estrutura de Branches

1. Estrutura inicial do projeto e README.md
2. Desenvolvimento da rota **POST**
3. Desenvolvimento da rota **GET**
4. Desenvolvimento da rota **DELETE**
5. Branch intermediária para **testes e workflows**
6. Versão final e estável do projeto