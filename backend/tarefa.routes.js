const express = require("express");
const Tarefa = require("./tarefa.model");

const router = express.Router();

router.post("/tarefas", async (req, res) => {
  const tarefa = await Tarefa.create(req.body);
  res.json(tarefa);
});

router.get("/tarefas", async (req, res) => {
  const tarefas = await Tarefa.findAll();
  res.json(tarefas);
});

router.get("/tarefas/:id", async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.json(tarefa);
});

router.put("/tarefas/:id", async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });
  await tarefa.update(req.body);
  res.json(tarefa);
});

router.delete("/tarefas/:id", async (req, res) => {
  const tarefa = await Tarefa.findByPk(req.params.id);
  if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });
  await tarefa.destroy();
  res.json({ message: "Tarefa excluída" });
});

module.exports = router;
