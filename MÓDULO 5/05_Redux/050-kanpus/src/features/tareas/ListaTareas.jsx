import { useState, useContext } from "react"
import { eliminada, alternada, creada, modificada, todasCompletadas } from "./tareasSlice"
import { useDispatch, useSelector } from "react-redux"
import Boton from "../../common/Boton"
import ContextoTema from "../../common/Tema"

const Tarea = ({ id, titulo, completada }) => {
  const dispatch = useDispatch()
  const eliminarTarea = () => dispatch(eliminada(id))
  const alternarTarea = () => dispatch(alternada(id))
  const editarTarea = (event) => {
    dispatch(modificada({ id, titulo: event.target.value }))
  }

  return (
    <li className={completada ? "done" : "todo"}>
      <label>
        <input type="checkbox" checked={completada} onChange={alternarTarea} />
        {completada ? "DONE" : "TODO"}
      </label>
      <input type="text" value={titulo} onChange={editarTarea} disabled={completada} />
      <Boton onClick={eliminarTarea}>Eliminar</Boton>
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
  const dispatch = useDispatch()
  const tema = useContext(ContextoTema)
  const tareas = useSelector(state => state.tareas.lista)

  if (tareas.length == 0) {
    return null;
  }

  return (
    <>
      <Boton onClick={()=>dispatch(todasCompletadas())}>
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