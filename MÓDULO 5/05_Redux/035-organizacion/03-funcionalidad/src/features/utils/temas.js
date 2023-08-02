import { createContext } from "react"

export const temas = {
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

export const ContextoTema = createContext()
