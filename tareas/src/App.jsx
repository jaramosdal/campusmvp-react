import "./App.css";
import Tarea from "./Tarea";

function App() {
  return (
    <div className="App">
      <h1>Kanpus</h1>
      <p>Tareas pendientes:</p>
      <ul>
        <Tarea titulo="Aprender componentes de React" />
        <Tarea titulo="Completar las prácticas del módulo 1" />
        <Tarea titulo="Realizar la autoevaluación" />
      </ul>
    </div>
  );
}

export default App;
