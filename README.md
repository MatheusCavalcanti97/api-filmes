# 🎬 API REST de Filmes

Este projeto consiste em uma API REST desenvolvida com **Node.js** e **Express**, que permite o gerenciamento de produtos — neste caso, **filmes**.  
A API foi construída com foco em simplicidade, organização, testes automatizados e boas práticas de versionamento com Git.

---

## Estrutura do Projeto
```
filmes-api/
│── app.js               # Configuração principal do Express.
│── package.json         # Dependências e scripts.
│── README.md            # Documentação.
│
├── server/              # Inicialização do servidor.
│   └── server.js
│
├── routes/              # Definição das rotas da API.
│   └── index.js
│
├── data/                # Estrutura de atributos para os objetos serem enviados via json.
│
├── __tests__/           # Testes automatizados com Jest + Supertest.
│   └── routes.test.js
│
└── .github/workflows/   # Fluxos de CI/CD no GitHub Actions.
    ├── commit-workflow.yml
    └── pr-workflow.yml
```

---

## 🚀 Como executar a API

### 1. Instale as dependências
```bash
npm install
```

### 2. Inicie o Servidor
```bash
npm start
```

### 3. Execute os Testes
```bash
npm test
```

---

## Endpoints disponíveis

### ➤ Rota GET — Listar filmes
**GET http://localhost:3000/api/filmes**

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

### Rota POST — Cadastrar filme
**POST http://localhost:3000/api/filmes**

Corpo da requisição (JSON):
```json
{
  "id": 2,
  "titulo": "O Senhor dos Anéis",
  "ano": 2001
}
```

---

## Testes Automatizados
Os testes foram implementados utilizando **Jest** e **Supertest**.  
Exemplo de teste em `__tests__/routes.test.js`:

```js
it('GET /api/filmes deve retornar status 200', async () => {
  const res = await request(app).get('/api/filmes');
  expect(res.status).toBe(200);
});
```

---

## Workflow Git utilizado
Optei por utilizar o **GitHub Flow**, que organiza o desenvolvimento em branches de funcionalidades e promove integração contínua com validação automatizada via **GitHub Actions**.

### Motivo da escolha
Escolhi esse fluxo porque ele é simples, direto e adequado para projetos individuais ou pequenos times. Ele permite que cada feature seja desenvolvida em uma branch isolada e integrada à `main` de forma segura, garantindo revisão e controle de qualidade mesmo em entregas rápidas.

### Estrutura de Branches
1. Estrutura inicial do projeto e README.md,
2. Desenvolvimento da rota **POST**;
3. Desenvolvimento da rota **GET**;
4. Branch intermediária para **testes e workflows**;
5. Versão final e estável do projeto.
