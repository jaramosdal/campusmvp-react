import "./App.css";

const Cabecera = ({ tareas }) => {
  if (tareas.length === 0) {
    return <p>¡Enhorabuena! No quedan tareas.</p>;
  }

  const numTareas = tareas.length;
  const numTareasPendinetes = tareas.filter(
    (tarea) => !tarea.completada
  ).length;

  return (
    <p>{`${numTareas} ${
      numTareas > 1 ? "tareas" : "tarea"
    }, ${numTareasPendinetes} ${
      numTareasPendinetes > 1 ? "pendientes" : "pendiente"
    }`}</p>
  );
};

const Tarea = ({ titulo, completada }) => {
  return (
    <li className={completada ? "done" : "todo"}>
      <label>
        <input type="checkbox" defaultChecked={completada} />
        {completada ? "DONE" : "TODO"}
      </label>
      {titulo}
      <button>Editar</button>
    </li>
  );
};

const ListaTareas = ({ tareas }) => {
  if (tareas.length == 0) {
    return null;
  }

  return (
    <ul>
      <Tarea {...tareas[0]} />
    </ul>
  );
};

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
      <Cabecera tareas={tareas} />
      <ListaTareas tareas={tareas} />
    </div>
  );
}

export default App;
