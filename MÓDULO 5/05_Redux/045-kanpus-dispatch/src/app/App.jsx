import { useState } from 'react'
import './App.css'
import FormularioSignup from '../features/signup/FormSignup'
import ContextoTema from '../common/Tema'
import Boton from '../common/Boton'
import ListaTareas from '../features/tareas/ListaTareas'
import { useSelector } from 'react-redux'

const temas = {
  claro: {
    "texto": "#3c3b3d",
    "fondo": "#eff1f5",
    "fondo2": "#ccd0da"
  },
  oscuro: {
    "texto": "#cdd6f4",
    "fondo": "#1e1e2e",
    "fondo2": "#313244"
  }
}

const Cabecera = () => {
  const tareas = useSelector(state => Object.values(state.tareas.lista))
  if (tareas.length == 0) {
    return <p>¡Enhorabuena! No quedan tareas.</p>
  }

  const pendientes = tareas.reduce((cuenta, tarea) => cuenta + !tarea.completada, 0)

  return <p>
    {tareas.length} tarea{(tareas.length !== 1) && "s"},
    {pendientes} pendiente{(pendientes !== 1) && "s"}
  </p>
}

const App = () => {
  const [tema, setTema] = useState("claro")

  return (
    <ContextoTema.Provider value={temas[tema]}>
      <div className="App">
        <h1>Kanpus</h1>
        <details><summary>Crear cuenta</summary><FormularioSignup /></details>
        <Cabecera />
        <ListaTareas />
        <p>{tema == "claro" 
        ? <Boton onClick={() => setTema("oscuro")}>Activar tema oscuro</Boton>
        : <Boton onClick={() => setTema("claro")}>Activar tema claro</Boton>
        }</p>
      </div>
    </ContextoTema.Provider>
  )
}

export default App
