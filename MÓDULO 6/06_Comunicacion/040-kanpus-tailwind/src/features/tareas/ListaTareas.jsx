import { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { OpcionBoton, CampoBoton, Item, Tarjeta } from "../utils/ui"
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
    <Item
      principal={titulo}
      opciones={<>
        <OpcionBoton onClick={onMoverIzquierda}>&lt;</OpcionBoton>
        <OpcionBoton onClick={onMoverDerecha}>&gt;</OpcionBoton>
        <OpcionBoton onClick={() => eliminarTarea(id)}>×</OpcionBoton>
      </>}
    >
      <input type="text" value={titulo} onChange={handleChange} />
    </Item>
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
      <CampoBoton input={{ type: "text", name: "titulo", placeholder: "Nueva tarea",
        onChange: event => setNuevaTitulo(event.target.value), value: nuevaTitulo }}
        boton={{ type: "submit", children: "Crear "}} />
    </form>
  )
}

const ListaTareas = ({ id: listaId, nombre }) => {
  // const tema = useContext(ContextoTema)
  const { data: tareas, isLoading, isSuccess, isError, error } = useGetListaTareasQuery(listaId)
  const dispatch = useDispatch()

  return (
    <Tarjeta
      top={<span className="font-bold text-gray-700 dark:text-gray-300">{nombre}</span>}
      bottom={<FormularioNueva listaId={listaId} />}
    >
      {isSuccess && tareas.length > 0 &&
        tareas.map(t => <Tarea key={t.id} id={t.id} titulo={t.titulo} 
          onMoverIzquierda={() => dispatch(tareaMovidaIzquierda({id: t.id, lista: listaId}))}
          onMoverDerecha={() => dispatch(tareaMovidaDerecha({id: t.id, lista: listaId}))} />)
      }
      {isLoading && <p>Cargando tareas...</p>}
      {isError && <p>Ocurrió un error al cargar tareas: {error.error}</p>} 
    </Tarjeta>
  )
}

export default ListaTareas