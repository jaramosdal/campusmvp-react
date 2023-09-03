import ui from '../features/utils/ui'
import { BarraMenu } from '../features/utils/ui'
import { NavLink, Outlet, useNavigation } from 'react-router-dom'


const App = () => {
  const navigation = useNavigation()
  return (
    <>
      <BarraMenu
        izq={
          <nav>
            Kanpus
            <NavLink to="/tableros" end className={({ isActive, isPending }) => 
              `${ui.opcion} ${isActive ? ui.active : isPending ? ui.pending : ""}`}>
              Mis tableros</NavLink>
          </nav>}
        dcha={
          <nav>
            <NavLink to="/login" className={({ isActive, isPending }) => 
              `${ui.opcion} ${isActive ? "hidden" : isPending ? ui.pending : ""}`}>Cerrar sesión</NavLink>
          </nav>}
        />
        <div className={navigation.state !== "idle" ? "brightness-50 saturate-50 transition-all" : ""}>
          <Outlet />
        </div>
    </>
  )
}

export default App
