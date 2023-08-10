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
import "./ListaTareas.css";

const Tarea = ({ id }) => {
  const { titulo, completada } = useSelector((state) => state.tareas.lista[id]);
  const dispatch = useDispatch();
  const eliminarTarea = () => dispatch(eliminada(id));
  const alternarTarea = () => dispatch(alternada(id));
  const editarTarea = (event) => {
    dispatch(modificada({ id, titulo: event.target.value }));
  };

  return (
    <li className={completada ? "done" : "todo"}>
      <label>
        <input
          type="checkbox"
          checked={completada}
          onChange={alternarTarea}
          readOnly
        />
        {completada ? "DONE" : "TODO"}
      </label>
      <input
        type="text"
        value={titulo}
        onChange={editarTarea}
        disabled={completada}
      />
      <Boton onClick={eliminarTarea}>Eliminar</Boton>
    </li>
  );
};

const FormularioNueva = () => {
  const [nuevaTitulo, setNuevaTitulo] = useState("");
  const dispatch = useDispatch();

  const manejarSubmit = (event) => {
    event.preventDefault();
    dispatch(creada(nuevaTitulo));
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

const ListaTareas = ({ id: listaId }) => {
  const { nombre, lista: tareas } = useSelector(
    (state) => state.tablero[listaId]
  );
  const tema = useContext(ContextoTema);

  return (
    <div
      className="lista"
      style={{ background: tema.fondo, color: tema.texto }}
    >
      <h2>{nombre}</h2>
      {tareas.length > 0 && (
        <ul>
          {tareas.map((id) => (
            <Tarea key={id} id={id} />
          ))}
        </ul>
      )}
      <FormularioNueva listaId={listaId} />
    </div>
  );
};

export default ListaTareas;
