const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '.env' });

const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Variável de ambiente ${key} não está definida`);
  }
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;