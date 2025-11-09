require('dotenv').config();
const app = require('../app');
const sequelize = require('../config/database');
const Filme = require('../models/Filme.js');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  sequelize.sync().then(async () => {
    console.log('Banco sincronizado com sucesso');

    const tables = await sequelize.getQueryInterface().showAllTables();
    if (tables.includes('filmes')) {
      console.log('Tabela "filmes" criada e pronta para uso');
    } else {
      console.error('Tabela "filmes" não foi criada');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}/api/filmes`);
    });
  }).catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  });
}

module.exports = app;