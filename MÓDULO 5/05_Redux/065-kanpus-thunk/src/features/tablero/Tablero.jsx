import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Boton from "../../common/Boton"
import ListaTareas from "../tareas/ListaTareas"
import { listaCreada } from "./tableroSlice"

const Tablero = () => {
  const listas = useSelector(state => Object.keys(state.tablero))
  const [nuevaLista, setNuevaLista] = useState("")
  const dispatch = useDispatch()
  const crearLista = (event) => {
    event.preventDefault()
    dispatch(listaCreada(nuevaLista))
    setNuevaLista("")
  }
  return (
    <div className="tablero">
      {listas.map(id => <ListaTareas key={id} id={id} />)}
      <div className="lista">
        <form onSubmit={crearLista}>
          <input type="text" placeholder="Nueva lista" value={nuevaLista} onChange={e => setNuevaLista(e.target.value)} />
          <p><Boton type="submit">Crear lista</Boton></p>
        </form>
      </div>
    </div>
  )
}

export default Tablero