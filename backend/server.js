const express = require("express");
const cors = require("cors");
const tarefaRoutes = require("./tarefa.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(tarefaRoutes);

app.listen(3001, () => console.log("API rodando em http://localhost:3000"));
