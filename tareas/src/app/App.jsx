import { useState } from "react";
import "./App.css";
import FormularioSignup from "../features/cuenta/FormSignup";
import { ContextoTema, temas } from "../features/utils/temas";
import Boton from "../features/utils/Boton";
import { useSelector } from "react-redux";
import Tablero from "../features/tablero/Tablero";

const Cabecera = () => {
  const tareas = useSelector((state) => Object.values(state.tareas.tareas));
  if (tareas.length == 0) {
    return <p>¡Enhorabuena! No quedan tareas.</p>;
  }

  const pendientes = tareas.reduce(
    (cuenta, tarea) => cuenta + tarea.completada,
    0
  );

  return (
    <p>
      {tareas.length} tarea{tareas.length > 1 && "s"},{pendientes} pendiente
      {pendientes > 1 && "s"}
    </p>
  );
};

const App = () => {
  const [tema, setTema] = useState("claro");

  return (
    <ContextoTema.Provider value={temas[tema]}>
      <div className="App">
        <h1>Kanpus</h1>
        <details>
          <summary>Crear cuenta</summary>
          <FormularioSignup />
        </details>
        <Cabecera />
        <Tablero />
        <p>
          {tema == "claro" ? (
            <Boton onClick={() => setTema("oscuro")}>Activar tema oscuro</Boton>
          ) : (
            <Boton onClick={() => setTema("claro")}>Activar tema claro</Boton>
          )}
        </p>
      </div>
    </ContextoTema.Provider>
  );
};

export default App;
