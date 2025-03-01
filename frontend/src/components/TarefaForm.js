import { useState, useEffect, useCallback } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { api } from "./api";

const TarefaForm = ({ onTarefaAdicionada, tarefaId, onTarefaAtualizada }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [erro, setErro] = useState(null); // Estado para exibir erro
  const [tarefaData, setTarefaData] = useState(null); // Para armazenar dados da tarefa para exibição na tabela

  // Função para buscar tarefa por ID com useCallback para evitar a recriação em cada renderização
  const buscarTarefa = useCallback(async () => {
    if (tarefaId) {
      setLoading(true); // Começar o carregamento
      try {
        const res = await api.get(`/tarefas/${tarefaId}`);
        setTitulo(res.data.titulo);
        setDescricao(res.data.descricao);
        setTarefaData(res.data); // Armazenando os dados da tarefa para exibição
      } catch (error) {
        console.error("Erro ao buscar tarefa:", error);
        setErro("Erro ao buscar a tarefa.");
      } finally {
        setLoading(false); // Finalizar carregamento
      }
    }
  }, [tarefaId]);

  // Chamar a função de busca quando o componente carregar ou quando o tarefaId mudar
  useEffect(() => {
    buscarTarefa();
  }, [tarefaId, buscarTarefa]); // Adiciona a função 'buscarTarefa' nas dependências

  // Função para adicionar nova tarefa
  const adicionarTarefa = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setErro(null); // Limpar erro antes de nova requisição
    setLoading(true); // Começar o carregamento
    try {
      const res = await api.post("/tarefas", { titulo, descricao });
      onTarefaAdicionada(res.data);
      setTitulo(""); // Limpar campo após adicionar
      setDescricao(""); // Limpar campo após adicionar
    } catch (error) {
      setErro("Erro ao adicionar a tarefa.");
      console.error("Erro ao adicionar tarefa:", error);
    } finally {
      setLoading(false); // Finalizar carregamento
    }
  };

  // Função para alterar tarefa existente
  const alterarTarefa = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setErro(null); // Limpar erro antes de nova requisição
    setLoading(true); // Começar o carregamento
    try {
      const res = await api.put(`/tarefas/${tarefaId}`, { titulo, descricao });
      onTarefaAtualizada(res.data);
      setTitulo(""); // Limpar campo após atualizar
      setDescricao(""); // Limpar campo após atualizar
    } catch (error) {
      setErro("Erro ao alterar a tarefa.");
      console.error("Erro ao alterar tarefa:", error);
    } finally {
      setLoading(false); // Finalizar carregamento
    }
  };

  const handleSubmit = tarefaId ? alterarTarefa : adicionarTarefa;

  return (
    <div>
      {/* Exibindo erro, se houver */}
      {erro && <div className="alert alert-danger">{erro}</div>}
      
      {/* Exibindo a tabela com os dados da tarefa quando houver tarefaData */}
      {tarefaData && (
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tarefaData.titulo}</td>
              <td>{tarefaData.descricao}</td>
            </tr>
          </tbody>
        </Table>
      )}

      {/* Formulário de edição ou adição de tarefa */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            disabled={loading} // Desabilitar campo durante carregamento
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            disabled={loading} // Desabilitar campo durante carregamento
          />
        </Form.Group>
        <Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : tarefaId ? "Alterar" : "Adicionar"}
        </Button> {/* Texto do botão e desabilitar enquanto carrega */}
      </Form>
    </div>
  );
};

export default TarefaForm;
