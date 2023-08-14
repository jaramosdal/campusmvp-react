import { useState } from "react"
import { CampoBoton, Item, OpcionBoton, Tarjeta } from "../utils/ui"
import ListaTareas from "../tareas/ListaTareas"
import { intercambiarListas, useCreateListaMutation, useDeleteListaMutation, useGetTableroQuery } from "../api/apiSlice"
import { useDispatch } from "react-redux"

const EdicionListas = () => {
  const { data: listas } = useGetTableroQuery()
  const dispatch = useDispatch()
  const [eliminarLista, resEliminarLista] = useDeleteListaMutation()
  const [nuevaLista, setNuevaLista] = useState("")
  const [crearLista, resCrearLista] = useCreateListaMutation()

  const handleSubmit = event => {
    event.preventDefault()
    crearLista(nuevaLista)
    setNuevaLista("")
  }

  return (
    <Tarjeta 
      top={"Editar listas"}
      bottom={
        <form onSubmit={handleSubmit}>
          <CampoBoton input={{ type: "text", placeholder: "Nueva lista", value: nuevaLista,
            onChange: e => setNuevaLista(e.target.value) }}
            boton={{ type: "submit", children: "Crear" }} />
        </form>}
    >
      {listas.map((val) => 
          <Item key={val.id} principal={<p>{val.nombre}</p>} opciones={<>
            <OpcionBoton onClick={() => dispatch(intercambiarListas(val.orden - 1))}>&uarr;</OpcionBoton>
            <OpcionBoton onClick={() => dispatch(intercambiarListas(val.orden))}>&darr;</OpcionBoton>
            <OpcionBoton onClick={() => eliminarLista(val.id)}>×</OpcionBoton>
          </>} />
      )}
    </Tarjeta>
  )
}

const Tablero = () => {
  const {
    data: listas,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetTableroQuery()

  return (
    <div className="p-6 flex flex-col md:flex-row nowrap gap-3 align-stretch">
      {isSuccess && 
        <>
          {listas.map((val) => 
              <ListaTareas key={val.id} id={val.id} nombre={val.nombre} />
          )}
          <EdicionListas />
        </>
      }
      {isLoading && <p>Cargando tu tablero...</p>}
      {isError && <p>Ocurrió un error al cargar el tablero: {error.error}
        <button onClick={refetch}>¿Intentar de nuevo?</button></p>}
    </div>
  )
}

export default Tablero