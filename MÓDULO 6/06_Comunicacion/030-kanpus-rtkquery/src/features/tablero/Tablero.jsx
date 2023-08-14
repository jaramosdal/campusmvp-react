import { useState } from "react"
import Boton from "../../common/Boton"
import ListaTareas from "../tareas/ListaTareas"
import { useCreateListaMutation, useGetTableroQuery } from "../api/apiSlice"

const FormNuevaLista = () => {
  const [nuevaLista, setNuevaLista] = useState("")
  const [crearLista, resultado] = useCreateListaMutation()

  const handleSubmit = event => {
    event.preventDefault()
    crearLista(nuevaLista)
  }

  return (
    <div className="lista">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nueva lista" value={nuevaLista} onChange={e => setNuevaLista(e.target.value)} />
        <p><Boton type="submit">Crear lista</Boton></p>
      </form>
    </div>
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
    <div className="tablero">
      {isSuccess && 
        <>
          {listas.map((val) => 
              <ListaTareas key={val.id} id={val.id} nombre={val.nombre} />
          )}
          <FormNuevaLista/>
        </>
      }
      {isLoading && <p>Cargando tu tablero...</p>}
      {isError && <p>Ocurrió un error al cargar el tablero: {error.error}
        <button onClick={refetch}>¿Intentar de nuevo?</button></p>}
    </div>
  )
}

export default Tablero