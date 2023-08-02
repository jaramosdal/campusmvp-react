import { createSlice, nanoid } from "@reduxjs/toolkit"

// El initialState puede ser el valor de estado inicial o bien una
// función que genere el estado inicial al llamarla, por ejemplo,
// leyendo desde localStorage
const initialState = {
  lista: {
    1: {
      titulo: "Aprender componentes de React"
    },
    2: {
      titulo: "Completar las prácticas del módulo 1"
    },
    3: {
      titulo: "Realizar la autoevaluación"
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
    // (acción de tipo "tareas/modificada")
    modificada(state, action) {
      state.lista[action.payload.id].titulo = action.payload.titulo
    },
    // También podemos indicar el reducer y la función de preparación
    // que toma los parámetros que queramos y devuelve la acción con
    // los datos que necesitemos para el reducer.
    // (acción de tipo "tareas/creada")
    creada: {
      prepare(titulo, listaId) {
        return { payload: { id: nanoid(), titulo, listaId } }
      },
      reducer(state, action) {
        state.lista[action.payload.id] = {
          titulo: action.payload.titulo
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
  modificada
} = tareasSlice.actions

export const tareaDuplicada = tareaId => (dispatch, getState) => {
  const titulo = getState().tareas.lista[tareaId].titulo
  const tablero = getState().tablero
  const listaId = Object.keys(tablero).find(k => tablero[k].lista.includes(tareaId))

  dispatch(creada(titulo, listaId))
}

export default tareasSlice.reducer