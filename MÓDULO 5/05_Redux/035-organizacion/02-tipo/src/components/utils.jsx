import { useContext } from "react"
import { ContextoTema } from "../app/App"

export const Boton = (props) => {
  const tema = useContext(ContextoTema)
  return (
    <button style={{background: tema.fondo2, color: tema.texto}} {...props}></button>
  )
}
