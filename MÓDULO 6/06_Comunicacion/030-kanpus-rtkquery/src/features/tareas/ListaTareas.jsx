import { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import Boton from "../../common/Boton"
import ContextoTema from "../../common/Tema"
import "./ListaTareas.css"
import { tareaMovidaIzquierda, tareaMovidaDerecha, useCreateTareaMutation, useDeleteTareaMutation, useGetListaTareasQuery, useUpdateTareaMutation } from "../api/apiSlice"
import { useEffect } from "react"

const Tarea = ({ id, titulo: initialTitulo, onMoverIzquierda, onMoverDerecha }) => {
  const [titulo, setTitulo] = useState(initialTitulo)
  const [renombrarTarea, resultado] = useUpdateTareaMutation()
  const [eliminarTarea, resultado2] = useDeleteTareaMutation()

  useEffect(() => {
    const peticionRenombrado = renombrarTarea({id, titulo})
    return () => { peticionRenombrado?.abort() }
  }, [titulo])

  const handleChange = event => {
    setTitulo(event.target.value)
  }

  return (
    <li>
      <input type="text" value={titulo} onChange={handleChange} />
      <Boton onClick={onMoverIzquierda}>&lt;</Boton>
      <Boton onClick={onMoverDerecha}>&gt;</Boton>
      <Boton onClick={() => eliminarTarea(id)}>×</Boton>
    </li>
  )
}

const FormularioNueva = ({ listaId }) => {
  const [nuevaTitulo, setNuevaTitulo] = useState("")
  const [crearTarea, resultado] = useCreateTareaMutation()

  const manejarSubmit = (event) => {
    event.preventDefault()
    crearTarea({titulo: nuevaTitulo, lista: listaId})
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

const ListaTareas = ({ id: listaId, nombre }) => {
  const tema = useContext(ContextoTema)
  const { data: tareas, isLoading, isSuccess, isError, error } = useGetListaTareasQuery(listaId)
  const dispatch = useDispatch()

  return (
    <div className="lista" style={{background: tema.fondo, color: tema.texto}}>
      <h2>{nombre}</h2>
      {isSuccess
      && tareas.length > 0 &&
        <ul>
          {tareas.map(t => <Tarea key={t.id} id={t.id} titulo={t.titulo} 
            onMoverIzquierda={() => dispatch(tareaMovidaIzquierda({id: t.id, lista: listaId}))}
            onMoverDerecha={() => dispatch(tareaMovidaDerecha({id: t.id, lista: listaId}))} />)}
        </ul>
      }
      {isLoading && <p>Cargando tareas...</p>}
      {isError && <p>Ocurrió un error al cargar tareas: {error.error}</p>}
      <FormularioNueva listaId={listaId} />
    </div>
  )
}

export default ListaTareas