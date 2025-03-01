import { Button, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { api } from "./api";
import './styles/TarefaLista.css';

const TarefaLista = ({ tarefas, setTarefas }) => {
  const [editando, setEditando] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [buscaStatus, setBuscaStatus] = useState("");
  const [buscaId, setBuscaId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tarefasVisiveis, setTarefasVisiveis] = useState([]);

  useEffect(() => {
    setTarefasVisiveis(tarefas);
  }, [tarefas]);

  const excluirTarefa = async (id) => {
    try {
      await api.delete(`/tarefas/${id}`);
      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const editarTarefa = async (id) => {
    if (!titulo || !descricao || !status) {
      alert("Por favor, preencha todos os campos para editar a tarefa!");
      return;
    }

    try {
      const tarefaEditada = { titulo, descricao, status };
      await api.put(`/tarefas/${id}`, tarefaEditada);
      setTarefas(tarefas.map((t) =>
        t.id === id ? { ...t, titulo, descricao, status } : t
      ));
      setEditando(null);
      setTitulo("");
      setDescricao("");
      setStatus("Pendente");
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  const adicionarTarefa = async () => {
    if (!titulo || !descricao || !status) {
      alert("Por favor, preencha todos os campos para adicionar a tarefa!");
      return;
    }

    try {
      const novaTarefa = { titulo, descricao, status };
      const res = await api.post("/tarefas", novaTarefa);
      setTarefas([...tarefas, res.data]);
      setTitulo("");
      setDescricao("");
      setStatus("Pendente");
      setMensagem("Tarefa cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const buscarTarefas = async () => {
    try {
      const res = await api.get("/tarefas");
      setTarefas(res.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  const buscarPorTitulo = async () => {
    if (!buscaTitulo) {
      alert("Por favor, insira um título para buscar!");
      return;
    }
    try {
      const res = await api.get(`/tarefas?titulo=${buscaTitulo}`);
      setTarefas(res.data);
    } catch (error) {
      console.error("Erro ao buscar tarefa por título:", error);
    }
  };

  const buscarPorStatus = async () => {
    if (!buscaStatus) {
      alert("Por favor, selecione um status para buscar!");
      return;
    }
    try {
      const res = await api.get(`/tarefas?status=${buscaStatus}`);
      setTarefas(res.data);
    } catch (error) {
      console.error("Erro ao buscar tarefa por status:", error);
    }
  };

  const buscarPorId = async () => {
    if (!buscaId) {
      alert("Por favor, insira um ID para buscar!");
      return;
    }
    try {
      const res = await api.get(`/tarefas/${buscaId}`);
      setTarefas([res.data]);
    } catch (error) {
      console.error("Erro ao buscar tarefa por ID:", error);
    }
  };

  return (
    <>
      <h2 className="titulo-principal">Gerenciamento de Tarefas</h2>
      {mensagem && <Alert variant="success">{mensagem}</Alert>}
      <Form className="formulario">
        <Form.Group className="campo">
          <Form.Control
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="campo">
          <Form.Control
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="campo">
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Finalizado">Finalizado</option>
          </Form.Control>
        </Form.Group>
        {editando ? (
          <Button className="btn-editar" onClick={() => editarTarefa(editando)}>Salvar Alterações</Button>
        ) : (
          <Button className="btn-adicionar" onClick={adicionarTarefa}>Adicionar Tarefa</Button>
        )}
      </Form>
      <div className="botoes-busca">
        <Button className="btn-buscar" onClick={buscarTarefas}>Buscar Todas</Button>
        <Form.Control
          className="campo-busca"
          type="text"
          placeholder="Buscar por Título"
          value={buscaTitulo}
          onChange={(e) => setBuscaTitulo(e.target.value)}
        />
        <Button className="btn-buscar" onClick={buscarPorTitulo}>Buscar Título</Button>
        <Form.Control
          className="campo-busca"
          as="select"
          value={buscaStatus}
          onChange={(e) => setBuscaStatus(e.target.value)}
        >
          <option value="">Selecione Status</option>
          <option value="Pendente">Pendente</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Finalizado">Finalizado</option>
        </Form.Control>
        <Button className="btn-buscar" onClick={buscarPorStatus}>Buscar Status</Button>
        <Form.Control
          className="campo-busca"
          type="text"
          placeholder="Buscar por ID"
          value={buscaId}
          onChange={(e) => setBuscaId(e.target.value)}
        />
        <Button className="btn-buscar" onClick={buscarPorId}>Buscar por ID</Button>
      </div>
      {tarefasVisiveis && (
        <div className="lista-tarefas mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tarefasVisiveis.map((t) => (
                <tr key={t.id}>
                  <td>{t.titulo}</td>
                  <td>{t.descricao}</td>
                  <td>{t.status}</td>
                  <td>
                    <Button
                      className="btn-editar-tarefa"
                      onClick={() => {
                        setTitulo(t.titulo);
                        setDescricao(t.descricao);
                        setStatus(t.status);
                        setEditando(t.id);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn-excluir-tarefa"
                      onClick={() => excluirTarefa(t.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TarefaLista;
