const { Sequelize } = require('sequelize');
require('dotenv').config();

// Lista de variáveis obrigatórias
const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'];

// Validação das variáveis de ambiente (exceto em ambientes de CI ou teste)
if (process.env.NODE_ENV !== 'ci' && process.env.NODE_ENV !== 'test') {
  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Variável de ambiente ${key} não está definida`);
    }
  });
}

// Log para depuração (opcional — remova em produção)
console.log('Conectando ao banco com as seguintes configurações:');
console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  NODE_ENV: process.env.NODE_ENV,
});

// Proteção contra erro comum: nome do banco igual ao nome do usuário
if (process.env.DB_NAME === process.env.DB_USER) {
  console.warn('⚠️ Atenção: DB_NAME está igual a DB_USER. Verifique se isso é intencional.');
}

// Instância do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'postgres',
    logging: false,
  },
);

module.exports = sequelize;
