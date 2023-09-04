import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Boton from "../utils/Boton";
import { ContextoTema } from "../utils/temas";
import "./ListaTareas.css";
import { tareaCreada, tareaEliminada, tareaRenombrada } from "./tareasSlice";
import {
  // listaDuplicada,
  tareaMovidaDerecha,
  tareaMovidaIzquierda,
} from "../tablero/tableroSlice";

const Tarea = ({ id }) => {
  const { titulo: initialTitulo } = useSelector(
    (state) => state.tareas.tareas[id]
  );
  const dispatch = useDispatch();
  // ATENCIÓN: al establecer el título con useState, este hook pasa a controlar su
  // estado y por tanto no se actualiza cuando se carguen tareas del servidor.
  // Lo ideal sería permitir la edición (y por tanto usar useState) únicamente
  // cuando el usuario decida editar el título
  const [titulo, setTitulo] = useState(initialTitulo);
  const eliminarTarea = () => dispatch(tareaEliminada(id));
  const editarTarea = (event) => {
    setTitulo(event.target.value);
    dispatch(tareaRenombrada({ id, titulo: event.target.value }));
  };

  return (
    <>
      <li>
        <input type="text" value={titulo} onChange={editarTarea} />
        <Boton onClick={() => dispatch(tareaMovidaIzquierda(id))}>&lt;</Boton>
        <Boton onClick={() => dispatch(tareaMovidaDerecha(id))}>&gt;</Boton>
        <Boton onClick={eliminarTarea}>×</Boton>
      </li>
    </>
  );
};

const FormularioNueva = ({ listaId }) => {
  const [nuevaTitulo, setNuevaTitulo] = useState("");
  const dispatch = useDispatch();

  const manejarSubmit = (event) => {
    event.preventDefault();
    dispatch(tareaCreada({ titulo: nuevaTitulo, lista: listaId })).then(() =>
      setNuevaTitulo("")
    );
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
    (state) => state.tablero.listas[listaId] ?? { nombre: "", lista: [] }
  );
  const status = useSelector((state) => state.tareas.status);
  const tema = useContext(ContextoTema);

  // const dispatch = useDispatch();

  // const handleDuplicarLista = () => {
  //   dispatch(listaDuplicada(listaId));
  // };

  return (
    <div
      className="lista"
      style={{ background: tema.fondo, color: tema.texto }}
    >
      <h2>{nombre}</h2>
      {status == "LOADING" && <p>Cargando tareas...</p>}
      {status == "FAILED" && <p>Ocurrió un error</p>}
      {status == "SUCCESS" && (
        <ul>
          {tareas.map((id) => (
            <Tarea key={id} id={id} />
          ))}
        </ul>
      )}
      <FormularioNueva listaId={listaId} />

      {/* <p>
        <Boton type="submit" onClick={handleDuplicarLista}>
          Duplicar lista
        </Boton>
      </p> */}
    </div>
  );
};

export default ListaTareas;
