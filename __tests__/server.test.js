const { app, iniciarServidor } = require('../server/');

jest.mock('../app', () => ({
  listen: jest.fn(),
}));

describe('server.js', () => {
  beforeEach(() => {
    app.listen.mockClear();
  });

  it('deve iniciar sem chamar app.listen quando startServer=false', async () => {
    await iniciarServidor({ debug: false, startServer: false });
    expect(app.listen).not.toHaveBeenCalled();
  });

  it('deve lançar erro se tabela "filmes" não existir', async () => {
    const mockGetQueryInterface = {
      showAllTables: jest.fn().mockResolvedValue([]),
    };
    const mockSequelize = {
      sync: jest.fn(),
      getQueryInterface: () => mockGetQueryInterface,
    };

    await expect(
      require('../server').iniciarServidor.call({ sequelize: mockSequelize }, { debug: false, startServer: false })
    ).rejects.toThrow('Tabela "filmes" não foi criada');
  });

  it('deve chamar app.listen quando startServer=true', async () => {
    const server = await iniciarServidor({ debug: false, startServer: true });
    expect(app.listen).toHaveBeenCalled();
    expect(server).not.toBeNull();
  });
});
