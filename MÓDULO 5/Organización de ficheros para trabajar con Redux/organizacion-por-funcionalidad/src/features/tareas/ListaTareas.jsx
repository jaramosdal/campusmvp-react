import { useState, useContext } from "react";
import {
  eliminada,
  alternada,
  creada,
  modificada,
  todasCompletadas,
} from "./tareasSlice";
import { useDispatch, useSelector } from "react-redux";
import Boton from "../utils/Boton";
import { ContextoTema } from "../utils/temas";

const Tarea = ({ id, titulo, completada }) => {
  return (
    <li className={completada ? "done" : "todo"}>
      <label>
        <input type="checkbox" checked={completada} readOnly />
        {completada ? "DONE" : "TODO"}
      </label>
      <input type="text" value={titulo} disabled={completada} readOnly />
      <Boton>Eliminar</Boton>
    </li>
  );
};

const FormularioNueva = () => {
  const [nuevaTitulo, setNuevaTitulo] = useState("");

  const manejarSubmit = (event) => {
    event.preventDefault();
    setNuevaTitulo("");
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        name="titulo"
        placeholder="Nueva tarea"
        onChange={(event) => setNuevaTitulo(event.target.value)}
        value={nuevaTitulo}
      />
    </form>
  );
};

const ListaTareas = () => {
  const tema = useContext(ContextoTema);
  const tareas = useSelector((state) => state.tareas.lista);

  if (tareas.length == 0) {
    return null;
  }

  return (
    <>
      <Boton>Marcar como completadas</Boton>
      <ul style={{ background: tema.fondo, color: tema.texto }}>
        {Object.entries(tareas).map(([id, tarea]) => (
          <Tarea {...tarea} key={id} id={id} />
        ))}
      </ul>
      <FormularioNueva />
    </>
  );
};

export default ListaTareas;
