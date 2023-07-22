import "./App.css";
import ListaTareas from "./ListaTareas";

function App() {
  const tareas = [
    {
      titulo: "Aprender componentes de React",
      completada: false,
    },
    {
      titulo: "Completar las prácticas del módulo 1",
      completada: true,
    },
    {
      titulo: "Realizar la autoevaluación",
      completada: false,
    },
  ];

  return (
    <div className="App">
      <h1>Kanpus</h1>
      <p>Tareas pendientes:</p>
      <ListaTareas tareas={tareas} />
    </div>
  );
}

export default App;
