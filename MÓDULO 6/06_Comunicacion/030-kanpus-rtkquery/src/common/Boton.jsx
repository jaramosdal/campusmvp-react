import { useContext } from "react"
import ContextoTema from "./Tema"

const Boton = (props) => {
  const tema = useContext(ContextoTema)
  return (
    <button style={{background: tema.fondo2, color: tema.texto}} {...props}></button>
  )
}

export default Boton