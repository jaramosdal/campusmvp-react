import { useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import Boton from "../../common/Boton"
import ContextoTema from "../../common/Tema"
import { alternada, creada, eliminada, modificada, todasCompletadas } from "./tareasSlice"

const Tarea = ({ id, titulo, completada }) => {
  const dispatch = useDispatch()
  const eliminar = () => dispatch(eliminada(id))
  const alternar = () => dispatch(alternada(id))
  const editar = (event) => {
    dispatch(modificada({ id, titulo: event.target.value }))
  }
  return (
    <li className={completada ? "done" : "todo"}>
      <label>
        <input type="checkbox" checked={completada} onChange={alternar} />
        {completada ? "DONE" : "TODO"}
      </label>
      <input type="text" value={titulo} disabled={completada} onChange={editar} />
      <Boton onClick={eliminar}>Eliminar</Boton>
    </li>
  )
}

const FormularioNueva = () => {
  const [nuevaTitulo, setNuevaTitulo] = useState("")
  const dispatch = useDispatch()

  const manejarSubmit = (event) => {
    event.preventDefault()
    dispatch(creada(nuevaTitulo))
    setNuevaTitulo("")
  }

  return (
    <form onSubmit={manejarSubmit}>
      <input type="text" name="titulo" placeholder="Nueva tarea"
        onChange={event => setNuevaTitulo(event.target.value)}
        value={nuevaTitulo} />
    </form>
  )
}

const ListaTareas = () => {
  const tema = useContext(ContextoTema)
  const tareas = useSelector(state => state.tareas.lista)
  const dispatch = useDispatch()
  const marcarCompletadas = () => dispatch(todasCompletadas())

  if (tareas.length == 0) {
    return null;
  }

  return (
    <>
      <Boton onClick={marcarCompletadas}>
        Marcar como completadas
      </Boton>
      <ul style={{background: tema.fondo, color: tema.texto}}>
        {Object.entries(tareas).map(([id, tarea]) => <Tarea {...tarea} key={id} id={id} />)}
      </ul>
      <FormularioNueva />
    </>
  )
}

export default ListaTareas