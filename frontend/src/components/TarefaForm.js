import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { api } from "./api";
 
const TarefaForm = ({ onTarefaAdicionada }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const adicionarTarefa = async (e) => {
    e.preventDefault(); 

    try {
      const res = await api.post("/tarefas", { titulo, descricao });
      onTarefaAdicionada(res.data); 
      setTitulo("");  
      setDescricao("");  
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error); 
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

