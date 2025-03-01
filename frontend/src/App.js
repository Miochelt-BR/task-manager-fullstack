import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TarefaLista from "./components/TarefaLista";
import { api } from "./components/api";

const App = () => {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    // Busca as tarefas da API ao carregar o componente
    api.get("/tarefas").then((res) => setTarefas(res.data));
  }, []);

  return (
    <Container>
      
      <TarefaLista tarefas={tarefas} setTarefas={setTarefas} />
    </Container>
  );
};

export default App;
