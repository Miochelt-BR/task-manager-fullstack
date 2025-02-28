const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Tarefa = sequelize.define("Tarefa", {
  titulo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.ENUM("pendente", "concluído"), defaultValue: "pendente" }
});

sequelize.sync(); // Cria a tabela automaticamente

module.exports = Tarefa;
