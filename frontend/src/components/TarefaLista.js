import { ListGroup, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { api } from "./api";
import './styles/TarefaLista.css';

const TarefaLista = ({ tarefas, setTarefas }) => {
  const [editando, setEditando] = useState(null);  // Controla se estamos editando uma tarefa
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  // Função para excluir a tarefa
  const excluirTarefa = async (id) => {
    try {
      await api.delete(`/tarefas/${id}`);
      setTarefas(tarefas.filter((t) => t.id !== id));  // Atualiza a lista após a exclusão
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  // Função para editar a tarefa
  const editarTarefa = async (id) => {
    try {
      const tarefaEditada = { titulo, descricao, status };
      await api.put(`/tarefas/${id}`, tarefaEditada);  // Atualiza a tarefa via API
      setTarefas(
        tarefas.map((t) =>
          t.id === id ? { ...t, titulo, descricao, status } : t
        )
      );
      setEditando(null);  // Finaliza o modo de edição
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  // Função para salvar a nova tarefa
  const adicionarTarefa = async () => {
    try {
      const novaTarefa = { titulo, descricao, status };
      const res = await api.post("/tarefas", novaTarefa);  // Cria nova tarefa via API
      setTarefas([...tarefas, res.data]);  // Adiciona a nova tarefa ao estado
      setTitulo("");
      setDescricao("");
      setStatus("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  return (
    <>
      <h2 className="mt-4">Tarefas</h2>
      <Form className="mb-4">
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Group>
        {editando ? (
          <Button onClick={() => editarTarefa(editando)}>Salvar Alterações</Button>
        ) : (
          <Button onClick={adicionarTarefa}>Adicionar Tarefa</Button>
        )}
      </Form>

      <ListGroup className="mt-4">
        {tarefas.map((t) => (
          <ListGroup.Item
            key={t.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{t.titulo}</strong> - {t.status}
            </div>
            <div>
              <Button
                variant="warning"
                size="sm"
                onClick={() => {
                  setTitulo(t.titulo);
                  setDescricao(t.descricao);
                  setStatus(t.status);
                  setEditando(t.id);  // Ativa o modo de edição
                }}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => excluirTarefa(t.id)}
              >
                Excluir
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TarefaLista;
