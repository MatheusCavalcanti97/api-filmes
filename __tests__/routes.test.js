const request = require('supertest');
const app = require('../server/server');
const sequelize = require('../config/database');
const Filme = require('../models/Filme');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // recria a tabela
  await Filme.create({ titulo: 'Filme de Teste', ano: 2025 });
});

describe('Testando rotas da API', () => {
  it('GET /api/filmes deve retornar status 200', async () => {
    const res = await request(app).get('/api/filmes');
    expect(res.status).toBe(200);
  });
});