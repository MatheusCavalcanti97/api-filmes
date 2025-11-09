const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Filme = sequelize.define('Filme', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'O título não pode estar vazio',
      },
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error('O título deve ser uma string');
        }
      },
    },
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'O ano deve ser um número inteiro',
      },
      min: {
        args: [1888],
        msg: 'Ano mínimo permitido é 1888',
      },
      max: {
        args: [new Date().getFullYear()],
        msg: `Ano máximo permitido é ${new Date().getFullYear()}`,
      },
    },
  },
}, {
  tableName: 'filmes',
  timestamps: false,
});

module.exports = Filme;