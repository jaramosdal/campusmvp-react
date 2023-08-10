import { useState, useContext } from "react";
import {
  eliminada,
  alternada,
  creada,
  modificada,
  todasCompletadas,
  tareaDuplicada,
} from "./tareasSlice";
import { useDispatch, useSelector } from "react-redux";
import Boton from "../utils/Boton";
import { ContextoTema } from "../utils/temas";
import "./ListaTareas.css";
import { tableroEliminado, tableroRenombrado } from "../tablero/tableroSlice";

const Tarea = ({ id }) => {
  const { titulo, completada } = useSelector((state) => state.tareas.lista[id]);
  const dispatch = useDispatch();
  const eliminarTarea = () => dispatch(eliminada(id));
  const alternarTarea = () => dispatch(alternada(id));
  const editarTarea = (event) => {
    dispatch(modificada({ id, titulo: event.target.value }));
  };
  const duplicarTarea = () => dispatch(tareaDuplicada(id));

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
      <Boton onClick={duplicarTarea}>D</Boton>
      <Boton onClick={eliminarTarea}>X</Boton>
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
  const dispatch = useDispatch();
  const tema = useContext(ContextoTema);
  const handleNameChange = (event) => {
    dispatch(tableroRenombrado({ listaId, nombre: event.target.value }));
  };
  const handleElminar = () => {
    dispatch(tableroEliminado(listaId));
  };

  return (
    <div
      className="lista"
      style={{ background: tema.fondo, color: tema.texto }}
    >
      <h2>{nombre}</h2>
      <h2>
        <input type="text" value={nombre} onChange={handleNameChange} />
        <Boton type="submit" onClick={handleElminar}>
          X
        </Boton>
      </h2>
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
