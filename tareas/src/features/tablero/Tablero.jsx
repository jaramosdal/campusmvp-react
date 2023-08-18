import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListaTareas from "../tareas/ListaTareas";
import Boton from "../utils/Boton";
import { cargarTablero, listaCreada } from "./tableroSlice";
import { tareasCargadas } from "../tareas/tareasSlice";

const Tablero = () => {
  const { status, listas } = useSelector((state) => state.tablero);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cargarTablero()).then(() => dispatch(tareasCargadas()));
  }, [dispatch]);

  const [nuevaLista, setNuevaLista] = useState("");
  const crearLista = (event) => {
    event.preventDefault();
    dispatch(listaCreada(nuevaLista));
    setNuevaLista("");
  };

  if (status == "LOADING") return <p>Cargando tablero...</p>;
  if (status == "FAILED") return <p>Error al cargar el tablero.</p>;

  return (
    <div className="tablero">
      {Object.keys(listas).map((id) => (
        <ListaTareas key={id} id={id} />
      ))}
      <div className="lista">
        <form onSubmit={crearLista}>
          <input
            type="text"
            placeholder="Nueva lista"
            value={nuevaLista}
            onChange={(e) => setNuevaLista(e.target.value)}
          />
          <p>
            <Boton type="submit">Crear lista</Boton>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Tablero;
