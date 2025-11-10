const request = require('supertest');
const app = require('../app.js');
const sequelize = require('../config/database.js');
const Filme = require('../models/Filme.js');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Testando rotas da API', () => {
  describe('POST /api/filmes', () => {
    it('deve criar um filme válido', async () => {
      const res = await request(app).post('/api/filmes').send({
        titulo: 'Matrix',
        ano: 1999,
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.titulo).toBe('Matrix');
    });

    it('deve retornar 400 se faltar campos obrigatórios', async () => {
      const res = await request(app).post('/api/filmes').send({
        titulo: '',
        ano: '',
      });
      expect(res.status).toBe(400);
    });

    it('deve retornar 400 se ano não for número', async () => {
      const res = await request(app).post('/api/filmes').send({
        titulo: 'Ano inválido',
        ano: 'dois mil e vinte',
      });
      expect(res.status).toBe(400);
    });

    it('deve retornar 400 se título não for string', async () => {
      const res = await request(app).post('/api/filmes').send({
        titulo: 123,
        ano: 2000,
      });
      expect(res.status).toBe(400);
    });

    it('deve retornar 400 se ano for menor que 1888', async () => {
      const res = await request(app).post('/api/filmes').send({
        titulo: 'Antigo',
        ano: 1800,
      });
      expect(res.status).toBe(400);
    });

    it('deve retornar 400 se ano for maior que o atual', async () => {
      const proximoAno = new Date().getFullYear() + 1;
      const res = await request(app).post('/api/filmes').send({
        titulo: 'Futuro',
        ano: proximoAno,
      });
      expect(res.status).toBe(400);
    });

    it('deve retornar 409 se título já existir', async () => {
      await Filme.create({ titulo: 'Duplicado', ano: 2000 });
      const res = await request(app).post('/api/filmes').send({
        titulo: 'Duplicado',
        ano: 2000,
      });
      expect(res.status).toBe(409);
    });
  });

  describe('GET /api/filmes', () => {
    it('deve retornar lista de filmes', async () => {
      const res = await request(app).get('/api/filmes');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('deve retornar filmes existentes no banco', async () => {
      await Filme.create({ titulo: 'Interestelar', ano: 2014 });
      const res = await request(app).get('/api/filmes');
      expect(res.body.some(f => f.titulo === 'Interestelar')).toBe(true);
    });

    it('deve retornar 500 se Filme.findAll falhar', async () => {
      jest.spyOn(Filme, 'findAll').mockRejectedValueOnce(new Error('Erro simulado'));
      const res = await request(app).get('/api/filmes');
      expect(res.status).toBe(500);
    });
  });

  describe('DELETE /api/filmes/:id', () => {
    it('deve remover filme existente', async () => {
      const filme = await Filme.create({ titulo: 'Para Deletar', ano: 2022 });
      const res = await request(app).delete(`/api/filmes/${filme.id}`);
      expect(res.status).toBe(204);
    });

    it('deve retornar 404 se filme não existir', async () => {
      const res = await request(app).delete('/api/filmes/9999');
      expect(res.status).toBe(404);
    });

    it('deve retornar 400 se ID for inválido', async () => {
      const res = await request(app).delete('/api/filmes/abc');
      expect(res.status).toBe(400);
    });

    it('deve retornar 500 se Filme.destroy falhar', async () => {
      const filme = await Filme.create({ titulo: 'Erro ao deletar', ano: 2023 });

      jest.spyOn(filme, 'destroy').mockImplementationOnce(() => {
        throw new Error('Erro simulado');
      });

      jest.spyOn(Filme, 'findByPk').mockResolvedValueOnce(filme);

      const res = await request(app).delete(`/api/filmes/${filme.id}`);
      expect(res.status).toBe(500);
    });
  });
});
