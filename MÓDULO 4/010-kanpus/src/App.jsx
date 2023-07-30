import { useState } from 'react'
import './App.css'

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
        <button>Editar</button>
      }
      {completada &&
        <button onClick={eliminarTarea}>Eliminar</button>
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

  return (
    <>
      <ul>
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

  return (
    <div className="App">
      <h1>Kanpus</h1>
      <Cabecera tareas={tareas} />
      <ListaTareas tareas={tareas} />
      <FormularioNueva agregar={agregarTarea} />
    </div>
  )
}

export default App
