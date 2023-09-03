import ui from '../features/utils/ui'
import { BarraMenu } from '../features/utils/ui'
import { NavLink, Outlet, useNavigation, useRouteLoaderData } from 'react-router-dom'


const App = () => {
  const navigation = useNavigation()
  const user = useRouteLoaderData("sesion")?.user

  return (
    <>
      <BarraMenu
        izq={
          <>
            <span>Kanpus</span>
            {user && 
              <NavLink to="/tableros" end className={({ isActive, isPending }) => 
                `${ui.opcion} ${isActive ? ui.active : isPending ? ui.pending : ""}`}>
                Mis tableros</NavLink>
            }
          </>}
        dcha={user 
          ? <NavLink to="/cuenta/salir" className={ui.opcion}>Cerrar sesión</NavLink>
          : <>
            <NavLink to="/cuenta/acceder" className={({ isActive, isPending }) => 
                `${ui.opcion} ${isActive ? ui.active : isPending ? ui.pending : ""}`}>Iniciar sesión</NavLink>
            <NavLink to="/cuenta/crear" className={({ isActive, isPending }) => 
                `${ui.opcion} ${isActive ? ui.active : isPending ? ui.pending : ""}`}>Crear nueva cuenta</NavLink>
          </>}
        />
        <div className={navigation.state !== "idle" ? "animate-pulse saturate-50" : ""}>
          <Outlet />
        </div>
    </>
  )
}

export default App
