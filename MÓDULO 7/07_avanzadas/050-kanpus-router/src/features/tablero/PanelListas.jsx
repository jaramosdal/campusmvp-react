import { useDispatch } from "react-redux"
import { useLoaderData } from "react-router-dom"
import { tareaMovidaDerecha, tareaMovidaIzquierda, useGetListasQuery } from "../api/apiSlice"
import ListaTareas from "../tareas/ListaTareas"
import { Boton } from "../utils/ui"

const PanelListas = () => {
  const { id } = useLoaderData()
  const {
    data: listas,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetListasQuery(id)
  const dispatch = useDispatch()

  const moverTarea = (idLista) => (idTarea, avance) => () => 
    dispatch((avance ? tareaMovidaDerecha : tareaMovidaIzquierda)({id, idLista, idTarea}))
  
  return (
    <div className={`p-6 flex flex-col md:flex-row nowrap gap-3 align-stretch md:min-w-min ${isFetching ? "animate-pulse" : ""}`}>
      {isSuccess && 
        <>
          {listas.map((val) => 
              <ListaTareas key={val.id} id={val.id} nombre={val.nombre} onMoverTarea={moverTarea(val.id)} />
          )}
        </>
      }
      {isLoading && <p>Cargando tu tablero...</p>}
      {isError && <p>Ocurrió un error al cargar el tablero: {error.error}
        <Boton onClick={refetch}>¿Intentar de nuevo?</Boton></p>}
    </div>
  )
}

export default PanelListas