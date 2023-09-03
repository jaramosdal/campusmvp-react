import { Boton, BarraMenu, OpcionLink } from "../utils/ui"
import { useDeleteTableroMutation, useGetListasQuery, useGetTablerosQuery, useGetTareasQuery } from "../api/apiSlice"
import { Outlet, useLoaderData, useMatch, useNavigate } from "react-router-dom"

export const loader = async ({ params }) => {
  const id = params.tableroId
  const user = "alice"
  return { id, user }
}

export const Cabecera = () => {
  const { id, user } = useLoaderData()
  const match = useMatch({ path: "tableros/:id/edit", end: false })
  const { listas, ids, listasOk } = useGetListasQuery(id, {
    // Es importante usar el operador de acceso "?." en este caso
    // porque si los datos aún no están cargados provocará un error 
    selectFromResult: ({ data, isSuccess }) => ({ listas: data?.length, ids: data?.map(l => l.id) || [], listasOk: isSuccess })
  })
  const { tareas, tareasOk } = useGetTareasQuery(undefined, {
    selectFromResult: ({ data, isSuccess }) => ({ tareas: data?.filter(t => ids.includes(t.lista))?.length, tareasOk: isSuccess })
  })
  const { nombre, nombreOk } = useGetTablerosQuery(user, {
    selectFromResult: ({ data, isSuccess }) => ({ nombre: data?.find(t => t.id === id)?.nombre, nombreOk: isSuccess })
  })

  const [peticionBorrarTablero, _] = useDeleteTableroMutation()

  const navigate = useNavigate()
  const borrarTablero = () => {
    peticionBorrarTablero(id).then(() => { navigate("/tableros") })
  }

  return <BarraMenu secundaria
    izq={ <>
      <strong>{nombreOk ? nombre : "Cargando..."}</strong> · {listasOk && <>{listas} listas</>} · {tareasOk && <>{tareas} tareas</>}
    </> }
    dcha={<>
      { match 
      ? <OpcionLink to={`/tableros/${id}`}>Volver al tablero</OpcionLink>
      : <OpcionLink to="edit">Editar listas</OpcionLink>
      }
      <Boton onClick={borrarTablero}>Eliminar tablero</Boton>
    </>} />
}

const Tablero = () => {
  return (
    <>
      <Cabecera />
      <Outlet />
    </>
  )
}

export default Tablero