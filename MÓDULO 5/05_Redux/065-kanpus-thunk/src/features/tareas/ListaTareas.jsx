import { useState, useContext } from "react"
import { eliminada, creada, modificada, tareaDuplicada } from "./tareasSlice"
import { useDispatch, useSelector } from "react-redux"
import Boton from "../../common/Boton"
import ContextoTema from "../../common/Tema"
import "./ListaTareas.css"

const Tarea = ({ id }) => {
  const { titulo } = useSelector(state => state.tareas.lista[id])
  const dispatch = useDispatch()
  const eliminarTarea = () => dispatch(eliminada(id))
  const editarTarea = (event) => {
    dispatch(modificada({ id, titulo: event.target.value }))
  }
  const duplicarTarea = () => dispatch(tareaDuplicada(id))

  return (
    <li>
      <input type="text" value={titulo} onChange={editarTarea} />
      <Boton onClick={duplicarTarea}>D</Boton>
      <Boton onClick={eliminarTarea}>×</Boton>
    </li>
  )
}

const FormularioNueva = ({ listaId }) => {
  const [nuevaTitulo, setNuevaTitulo] = useState("")
  const dispatch = useDispatch()

  const manejarSubmit = (event) => {
    event.preventDefault()
    dispatch(creada(nuevaTitulo, listaId))
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

const ListaTareas = ({ id: listaId }) => {
  const { nombre, lista: tareas } = useSelector(state => state.tablero[listaId])
  const tema = useContext(ContextoTema)

  return (
    <div className="lista" style={{background: tema.fondo, color: tema.texto}}>
      <h2>{nombre}</h2>
      {tareas.length > 0 && (
        <ul>
          {tareas.map(id => <Tarea key={id} id={id} />)}
        </ul>
      )}
      <FormularioNueva listaId={listaId} />
      
    </div>
  )
}

export default ListaTareas