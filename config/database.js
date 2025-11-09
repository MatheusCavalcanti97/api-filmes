
const { Sequelize } = require('sequelize');
require('dotenv').config({ debug: false });

const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'];

if (process.env.NODE_ENV !== 'ci' && process.env.NODE_ENV !== 'test') {
  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Variável de ambiente ${key} não está definida`);
    }
  });
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'testdb',
  process.env.DB_USER || 'testuser',
  process.env.DB_PASSWORD || 'testpass',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
