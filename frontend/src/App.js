import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TarefaForm from "./components/TarefaForm";
import TarefaLista from "./components/TarefaLista";
import { api } from "./components/api";

const App = () => {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    api.get("/tarefas").then((res) => setTarefas(res.data));
  }, []);

  return (
    <Container>
      <h1 className="mt-4">Gerenciador de Tarefas</h1>
      <TarefaForm onTarefaAdicionada={(novaTarefa) => setTarefas([...tarefas, novaTarefa])} />
      <TarefaLista tarefas={tarefas} setTarefas={setTarefas} />
    </Container>
  );
};

export default App;
