import { ListGroup, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { api } from "./api";
import './styles/TarefaLista.css';

const TarefaLista = ({ tarefas, setTarefas }) => {
  const [editando, setEditando] = useState(null);  // Controla se estamos editando uma tarefa
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Pendente");

  // Função para excluir a tarefa
  const excluirTarefa = async (id) => {
    try {
      await api.delete(`/tarefas/${id}`);
      setTarefas(tarefas.filter((t) => t.id !== id));  // Atualiza a lista após a exclusão
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const editarTarefa = async (id) => {
    if (!titulo || !descricao || !status) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const tarefaEditada = { titulo, descricao, status };
      await api.put(`/tarefas/${id}`, tarefaEditada);  // Atualiza a tarefa via API
      setTarefas(
        tarefas.map((t) =>
          t.id === id ? { ...t, titulo, descricao, status } : t
        )
      );
      setEditando(null);  // Finaliza o modo de edição
      setTitulo("");
      setDescricao("");
      setStatus("Pendente");
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  // Função para salvar a nova tarefa
  const adicionarTarefa = async () => {
    if (!titulo || !descricao || !status) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const novaTarefa = { titulo, descricao, status };
      const res = await api.post("/tarefas", novaTarefa);  // Cria nova tarefa via API
      setTarefas([...tarefas, res.data]);  // Adiciona a nova tarefa ao estado
      setTitulo("");
      setDescricao("");
      setStatus("Pendente");
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
          <small className="d-block text-muted">O título ou nome da tarefa</small>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <small className="d-block text-muted">Detalhes sobre o que precisa ser feito</small>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Finalizado">Finalizado</option>
          </Form.Control>
          <small className="d-block text-muted">Escolha o status da tarefa</small>
        </Form.Group>
        {editando ? (
          <Button onClick={() => editarTarefa(editando)}>Salvar Alterações</Button>
        ) : (
          <Button onClick={adicionarTarefa}>Adicionar Tarefa</Button>
        )}
      </Form>

      <ListGroup className="mt-4">
        {/* Cabeçalho da lista com descrições */}
        <ListGroup.Item className="d-flex justify-content-between align-items-center bg-dark text-white">
          <div>
            <strong>Nome das Tarefas</strong>
            <small className="d-block text-muted">O título ou nome da tarefa</small>
          </div>
          <div>
            <strong>Descrição</strong>
            <small className="d-block text-muted">Detalhes sobre o que precisa ser feito</small>
          </div>
          <div>
            <strong>Status</strong>
            <small className="d-block text-muted">O status atual da tarefa</small>
          </div>
          <div>
            <strong>Ações</strong>
            <small className="d-block text-muted">Editar ou excluir a tarefa</small>
          </div>
        </ListGroup.Item>

        {tarefas.map((t) => (
          <ListGroup.Item
            key={t.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{t.titulo}</strong>
              <small className="d-block text-muted">Título da tarefa</small>
            </div>
            <div>
              {t.descricao}
              <small className="d-block text-muted">Descrição da tarefa</small>
            </div>
            <div>
              <strong>Status:</strong> {t.status}
              <small className="d-block text-muted">Status da tarefa</small>
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
              <small className="d-block text-muted">Clique para editar ou excluir</small>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TarefaLista;
