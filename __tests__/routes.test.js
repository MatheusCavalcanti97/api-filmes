const request = require('supertest');
const app = require('../server/server');

describe('Testando rotas da API', () => {
  it('GET /api/filmes deve retornar status 200', async () => {
    const res = await request(app).get('/api/filmes');
    expect(res.status).toBe(200);
  });
});
