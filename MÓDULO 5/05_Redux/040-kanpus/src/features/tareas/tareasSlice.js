import { createSlice, nanoid } from "@reduxjs/toolkit"

// El initialState puede ser el valor de estado inicial o bien una
// función que genere el estado inicial al llamarla, por ejemplo,
// leyendo desde localStorage
const initialState = {
  lista: {
    1: {
      titulo: "Aprender componentes de React",
      completada: false
    },
    2: {
      titulo: "Completar las prácticas del módulo 1",
      completada: true
    },
    3: {
      titulo: "Realizar la autoevaluación",
      completada: false
    }
  }
}

// La herramienta createSlice nos facilita la creación de acciones
// y el reducer principal de la slice simplemente indicando reducers
// individuales nombrados como las acciones que queremos procesar
const tareasSlice = createSlice({
  name: "tareas",
  initialState,
  reducers: {
    // Normalmente un reducer será una función (state, action) => nuevoState
    // Se crean mediante createReducer, lo que permite escribir código "mutante"
    // Este corresponde a la acción de tipo "tareas/eliminada"
    eliminada(state, action) {
      // Versión pura:
      // const {[action.payload]: _, ...lista} = state.lista
      // return { ...state, lista }
      // Versión "mutante":
      delete state.lista[action.payload]
    },
    // (acción de tipo "tareas/alternada")
    alternada(state, action) {
      state.lista[action.payload].completada = !state.lista[action.payload].completada
    },
    // (acción de tipo "tareas/modificada")
    modificada(state, action) {
      state.lista[action.payload.id].titulo = action.payload.titulo
    },
    // Un reducer puede no tomar una acción como parámetro si el resultado
    // es siempre el mismo, en este caso, completar todas las tareas
    // (tipo "tareas/todasCompletadas")
    todasCompletadas(state) {
      for (let id in state.lista) {
        state.lista[id].completada = true
      }
    },
    // También podemos indicar el reducer y la función de preparación
    // que toma los parámetros que queramos y devuelve la acción con
    // los datos que necesitemos para el reducer.
    // (acción de tipo "tareas/creada")
    creada: {
      prepare(titulo) {
        return { payload: { id: nanoid(), titulo } }
      },
      reducer(state, action) {
        state.lista[action.payload.id] = {
          titulo: action.payload.titulo,
          completada: false
        }
      }
    }
  }
})

// En tareasSlice.actions tendremos las funciones creadoras de acciones
// y en tareasSlice.reducer el reducer principal para esta slice
export const { 
  creada, 
  eliminada,
  alternada,
  modificada,
  todasCompletadas
} = tareasSlice.actions

export default tareasSlice.reducer