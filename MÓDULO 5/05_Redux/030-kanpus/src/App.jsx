import { useState, createContext, useContext } from 'react'
import './App.css'
import FormularioSignup from './FormSignup'

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
const ContextoTema = createContext();

const Cabecera = ({ tareas }) => {
  if (tareas.length == 0) {
    return <p>¡Enhorabuena! No quedan tareas.</p>
  }

  const pendientes = tareas.reduce((cuenta, tarea) => cuenta + tarea.completada, 0)

  return <p>
    {tareas.length} tarea{(tareas.length > 1) && "s"},
    {pendientes} pendiente{(pendientes > 1) && "s"}
  </p>
}

const Boton = (props) => {
  const tema = useContext(ContextoTema)
  return (
    <button style={{background: tema.fondo2, color: tema.texto}} {...props}></button>
  )
}

const Tarea = ({ titulo, completada }) => {
  const eliminarTarea = (event) => {
    // acciones para eliminar una tarea...
    console.log(`Tarea "${titulo}" eliminada.`)
  }

  return (
    <li className={completada ? "done" : "todo"}>
      <label><input type="checkbox" defaultChecked={completada} />{completada ? "DONE" : "TODO"}</label>
      {titulo}
      {completada ||
        <Boton>Editar</Boton>
      }
      {completada &&
        <Boton onClick={eliminarTarea}>Eliminar</Boton>
      }
    </li>
  )
}

const FormularioNueva = ({ agregar }) => {
  const [nuevaTitulo, setNuevaTitulo] = useState("")

  const manejarSubmit = (event) => {
    event.preventDefault()
    agregar(nuevaTitulo)
    setNuevaTitulo("")
  }

  return (
    <form onSubmit={manejarSubmit}>
      <input type="text" name="titulo" placeholder="Nueva tarea"
        onChange={event => setNuevaTitulo(event.target.value)}
        value={nuevaTitulo} />
    </form>
  )
}

const ListaTareas = ({ tareas }) => {
  if (tareas.length == 0) {
    return null;
  }

  const tema = useContext(ContextoTema)

  return (
    <>
      <ul style={{background: tema.fondo, color: tema.texto}}>
        {tareas.map((tarea, i) => <Tarea {...tarea} key={i} />)}
      </ul>
    </>
  )
}

function App() {
  const [tareas, setTareas] = useState([
    {
      titulo: "Aprender componentes de React",
      completada: false
    },
    {
      titulo: "Completar las prácticas del módulo 1",
      completada: true
    },
    {
      titulo: "Realizar la autoevaluación",
      completada: false
    }
  ])

  const agregarTarea = (titulo) => {
    const nueva = {titulo, completada: false}
    setTareas([...tareas, nueva])
  }

  const [tema, setTema] = useState("claro")

  return (
    <ContextoTema.Provider value={temas[tema]}>
      <div className="App">
        <h1>Kanpus</h1>
        <FormularioSignup />
        <Cabecera tareas={tareas} />
        <ListaTareas tareas={tareas} />
        <FormularioNueva agregar={agregarTarea} />
        {tema == "claro" 
        ? <Boton onClick={() => setTema("oscuro")}>Activar tema oscuro</Boton>
        : <Boton onClick={() => setTema("claro")}>Activar tema claro</Boton>
        }
      </div>
    </ContextoTema.Provider>
  )
}

export default App
