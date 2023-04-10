const sequelize = require('../src/config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    process.exit(0);
  } catch (error) {
    console.error('Não foi possível conectar-se ao banco de dados:', error);
    process.exit(1);
  }
})();