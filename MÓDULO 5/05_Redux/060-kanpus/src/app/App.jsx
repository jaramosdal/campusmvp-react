import { useState } from 'react'
import './App.css'
import FormularioSignup from '../features/signup/FormSignup'
import ContextoTema from '../common/Tema'
import Boton from '../common/Boton'
import Tablero from '../features/tablero/Tablero'
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
  const tareas = useSelector(state => Object.values(state.tareas.lista).length)
  if (tareas == 0) {
    return <p>¡Enhorabuena! No quedan tareas.</p>
  }

  return <p>
    Tienes {tareas} tarea{(tareas > 1) && "s"} en este tablero
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
        <Tablero />
        <p>{tema == "claro" 
        ? <Boton onClick={() => setTema("oscuro")}>Activar tema oscuro</Boton>
        : <Boton onClick={() => setTema("claro")}>Activar tema claro</Boton>
        }</p>
      </div>
    </ContextoTema.Provider>
  )
}

export default App
