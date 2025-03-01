const { Sequelize } = require("sequelize");

// Conexão MySQL
const sequelize = new Sequelize("task_manager", "root", "rootroot", {
  host: "localhost",
  dialect: "mysql",  // Dialeto para MySQL
  logging: false,    // Desativa o log de consultas SQL (opcional)
});

module.exports = sequelize;
