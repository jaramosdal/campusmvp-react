import FormularioSignup from '../features/signup/FormSignup'
import { Boton, BarraMenu, OpcionA } from '../features/utils/ui'
import Tablero from '../features/tablero/Tablero'
import { useGetTableroQuery, useGetTareasQuery } from '../features/api/apiSlice'

const Cabecera = () => {
  const { tareas } = useGetTareasQuery(undefined, {
    // Es importante usar el operador de acceso "?." en este caso
    // porque si los datos aún no están cargados provocará un error 
    selectFromResult: ({ data }) => ({ tareas: data?.length })
  })
  const { listas } = useGetTableroQuery(undefined, {
    selectFromResult: ({ data }) => ({ listas: data?.length })
  })

  return <BarraMenu secundaria
    izq={<span>Nombre del tablero</span>}
    dcha={<>
      <span>{listas} listas · {tareas} tareas</span>
      <Boton>Editar listas</Boton>
      <Boton>Eliminar tablero</Boton>
    </>} />
}

const App = () => {
  return (
    <>
      <BarraMenu
        izq={
          <nav>
            Kanpus
            <OpcionA>Mis tableros</OpcionA>
          </nav>}
        dcha={
          <nav>
            <OpcionA>Cerrar sesión</OpcionA>
          </nav>}
        />
      <Cabecera />
      <Tablero />
      <div className='hidden'><FormularioSignup /></div>
    </>
  )
}

export default App
