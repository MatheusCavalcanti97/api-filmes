describe('Configuração do Sequelize', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); 
    process.env = { ...ORIGINAL_ENV }; 
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  test('deve lançar erro se variável obrigatória estiver ausente fora de ambiente de teste/ci', () => {
    process.env = { NODE_ENV: 'development' };
    jest.resetModules();

    jest.isolateModules(() => {
      jest.mock('dotenv', () => ({
        config: jest.fn(() => ({})),
      }));

      expect(() => {
        require('../config/database');
      }).toThrow(/Variável de ambiente DB_NAME não está definida/);
    });
  });

  test('não deve lançar erro se estiver em ambiente de teste', () => {
    process.env = { NODE_ENV: 'test' };
    jest.resetModules();

    jest.isolateModules(() => {
      jest.mock('dotenv', () => ({
        config: jest.fn(() => ({})),
      }));

      expect(() => {
        require('../config/database');
      }).not.toThrow();
    });
  });

  test('não deve lançar erro se estiver em ambiente de ci', () => {
    process.env = { NODE_ENV: 'ci' };
    jest.resetModules();

    jest.isolateModules(() => {
      jest.mock('dotenv', () => ({
        config: jest.fn(() => ({})),
      }));

      expect(() => {
        require('../config/database');
      }).not.toThrow();
    });
  });
});
