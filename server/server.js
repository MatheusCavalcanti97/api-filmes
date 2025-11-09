
require('dotenv').config({ debug: false });

const app = require('../app');
const sequelize = require('../config/database.js');

const PORT = process.env.PORT || 3000;

async function iniciarServidor({ debug = true, startServer = true } = {}) {
  try {
    await sequelize.sync();
    if (debug) {console.log('Banco sincronizado com sucesso');}
    const tables = await sequelize.getQueryInterface().showAllTables();
    const filmesTableExists = tables.includes('filmes');

    if (!filmesTableExists) {
      const errMsg = 'Tabela "filmes" não foi criada';
      if (debug) {console.error(errMsg);}
      throw new Error(errMsg);
    }

    if (debug) {console.log('Tabela "filmes" criada e pronta para uso');}

    if (startServer) {
      const server = app.listen(PORT, () => {
        if (debug) {
          console.log(`Servidor rodando em http://localhost:${PORT}/api/filmes`);
        }
      });
      return server;
    }

    return null;
  } catch (err) {
    if (debug) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
    }
    throw err;
  }
}

if (require.main === module) {
  iniciarServidor().catch(() => process.exit(1));
}

module.exports = { app, iniciarServidor };
