# 🎬 API REST de Filmes

Este projeto consiste em uma API REST desenvolvida com **Node.js** e **Express**, que permite o gerenciamento de produtos — neste caso, **filmes**. A API foi construída com foco em simplicidade, organização e boas práticas de versionamento com Git.

---

## Como executar a API

### 1. Instale as dependências

```bash
npm install
```

### 2. Inicie o Servidor

```bash
npm start
```

## Endpoints disponíveis
### 3. Feature 1 — Rota GET
Obtém todos os filmes cadastrados:
**GET http://localhost:3000/api/filmes**

Resposta Esperada:
```
[
  {
    "id": 1,
    "titulo": "Matrix",
    "ano": 1999
  }
]
```

## Feature 2 — Rota POST
### Adiciona um novo filme ao sistema:
**POST http://localhost:3000/api/filmes**

Corpo da requisição (JSON):
```
{
  "id": 2,
  "titulo": "O Senhor dos Anéis",
  "ano": 2001
}
```



# Workflow Git utilizado
**Optei por utilizar um Feature Branch Workflow com integração intermediária, que organiza o desenvolvimento em etapas e garante maior controle sobre o que é integrado à versão final**

1. Estrutura de branches:
• Estrutura inicial do projeto e README.md
• Desenvolvimento da rota POST
• Desenvolvimento da rota GET
• Branch intermediária para testes e validação conjunta
• Versão final e estável do projeto

### Motivo da escolha:
Esse workflow permite que cada funcionalidade seja desenvolvida isoladamente, testada em conjunto na , e só então integrada à . Isso simula um ambiente colaborativo, mesmo em projetos individuais, e facilita a rastreabilidade de cada feature.



