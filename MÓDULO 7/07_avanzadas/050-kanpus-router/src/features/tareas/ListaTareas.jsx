import { useState } from "react"
import { CampoBoton, Item, OpcionBoton, Tarjeta } from "../utils/ui"
import { useCreateTareaMutation, useDeleteTareaMutation, useGetListaTareasQuery, useUpdateTareaMutation } from "../api/apiSlice"
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
      <CampoBoton
        input={{ type: "text", name: "titulo", placeholder: "Nueva tarea", 
          onChange: event => setNuevaTitulo(event.target.value), value: nuevaTitulo }}
        boton={{ type: "submit", children: "Crear" }} />
    </form>
  )
}

const ListaTareas = ({ id: listaId, nombre, onMoverTarea }) => {
  const { data: tareas, isLoading, isFetching, isSuccess, isError, error } = useGetListaTareasQuery(listaId)
  
  return (
    <Tarjeta
      top={<span className="font-bold text-gray-700 dark:text-gray-300">{nombre}</span>}
      bottom={<FormularioNueva listaId={listaId} />}
      className={isFetching ? "animate-pulse" : ""}
    >
      {isSuccess && tareas.length > 0 &&
        tareas.map(t => <Tarea key={t.id} id={t.id} titulo={t.titulo} 
          onMoverIzquierda={onMoverTarea(t.id, false)}
          onMoverDerecha={onMoverTarea(t.id, true)} />)
      }
      {isLoading && <p>Cargando tareas...</p>}
      {isError && <p>Ocurrió un error al cargar tareas: {error.error}</p>} 
    </Tarjeta>
  )
}

export default ListaTareas