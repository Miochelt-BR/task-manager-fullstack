import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { api } from "./api";
 // Certifique-se de que está exportando corretamente o objeto API

const TarefaForm = ({ onTarefaAdicionada }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const adicionarTarefa = async (e) => {
    e.preventDefault(); // Previne o envio do formulário padrão (que recarregaria a página)

    try {
      const res = await api.post("/tarefas", { titulo, descricao });
      onTarefaAdicionada(res.data); // Chama a função de callback passando a nova tarefa
      setTitulo("");  // Limpa o campo título
      setDescricao("");  // Limpa o campo descrição
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error); // Exibe erro no console, caso ocorra
    }
  };

  return (
    <Form onSubmit={adicionarTarefa}> {/* Alterado para usar onSubmit */}
      <Form.Group className="mb-2">
        <Form.Control
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          as="textarea"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Adicionar</Button> {/* Alterado para tipo "submit" */}
    </Form>
  );
};

export default TarefaForm;

