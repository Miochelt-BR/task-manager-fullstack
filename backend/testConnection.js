const sequelize = require("./database"); // Importando o arquivo database.js

async function testConnection() {
  try {
    await sequelize.authenticate(); // Tenta autenticar a conexão
    console.log("Conexão bem-sucedida com o banco de dados MySQL!");
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
  }
}

testConnection();