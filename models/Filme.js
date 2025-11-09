const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'filmes',
  timestamps: false,
});

module.exports = Filme;