const Filme = require('../models/Filme');

describe('Model Filme', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('deve ser definido corretamente', () => {
    expect(Filme).toBeDefined();
    expect(Filme.tableName).toBe('filmes');
  });

  it('deve lançar erro se título for vazio', async () => {
    const filme = Filme.build({ titulo: '', ano: 2020 });

    await expect(filme.validate()).rejects.toThrow('O título não pode estar vazio');
  });

  it('deve lançar erro se título não for string', async () => {
    const filme = Filme.build({ titulo: 12345, ano: 2020 });

    await expect(filme.validate()).rejects.toThrow('O título deve ser uma string');
  });

  it('deve lançar erro se ano não for inteiro', async () => {
    const filme = Filme.build({ titulo: 'Matrix', ano: 'ano' });

    await expect(filme.validate()).rejects.toThrow('O ano deve ser um número inteiro');
  });

  it('deve lançar erro se ano for menor que 1888', async () => {
    const filme = Filme.build({ titulo: 'Filme antigo', ano: 1500 });

    await expect(filme.validate()).rejects.toThrow('Ano mínimo permitido é 1888');
  });

  it('deve lançar erro se ano for maior que o atual', async () => {
    const filme = Filme.build({ titulo: 'Do futuro', ano: new Date().getFullYear() + 1 });

    await expect(filme.validate()).rejects.toThrow(`Ano máximo permitido é ${new Date().getFullYear()}`);
  });

  it('deve validar corretamente quando dados são válidos', async () => {
    const filme = Filme.build({ titulo: 'Interestelar', ano: 2014 });
    await expect(filme.validate()).resolves.toBeTruthy();
  });
});
