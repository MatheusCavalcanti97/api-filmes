const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../server/server");

const filePath = path.join(__dirname, "../data/filmes.json");

beforeEach(() => {
  fs.writeFileSync(filePath, JSON.stringify([]));
});

describe("Testando rotas da API", () => {
  it("GET /api/filmes deve retornar um array vazio inicialmente", async () => {
    const res = await request(app).get("/api/filmes");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/filmes deve adicionar um filme", async () => {
    const novoFilme = { id: 1, titulo: "Matrix", ano: 1999 };

    const res = await request(app).post("/api/filmes").send(novoFilme);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(novoFilme);

    const resGet = await request(app).get("/api/filmes");
    expect(resGet.status).toBe(200);
    expect(resGet.body).toEqual([novoFilme]);
  });

  it("POST /api/filmes deve retornar 400 se faltar campos obrigatórios", async () => {
    const res = await request(app).post("/api/filmes").send({ titulo: "Sem ID" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });
});
