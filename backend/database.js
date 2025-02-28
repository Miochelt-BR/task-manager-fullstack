const { Sequelize } = require("sequelize");

// Conexão SQLite em memória
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", 
  logging: false,
});

module.exports = sequelize;
