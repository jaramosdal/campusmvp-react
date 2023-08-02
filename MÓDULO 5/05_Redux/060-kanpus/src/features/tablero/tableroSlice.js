import { createSlice, nanoid } from "@reduxjs/toolkit"
import { creada, eliminada } from "../tareas/tareasSlice"

const initialState = {
  todo: {
    nombre: "Pendiente",
    lista: [2,3]
  },
  doing: {
    nombre: "En proceso",
    lista: [1]
  },
  done: {
    nombre: "Completado",
    lista: []
  }
}

const tableroSlice = createSlice({
  name: "tablero",
  initialState,
  reducers: {
    listaCreada: {
      reducer(state, action) {
        state[action.payload.id] = { 
          nombre: action.payload.nombre,
          lista: []
        }
      },
      prepare(nombre) {
        return { payload: { id: nanoid(), nombre } }
      }
    },
    tareaQuitada(state, action) {
      state[action.payload.from_id].lista.splice(
        state[action.payload.from_id].lista.indexOf(action.payload.tarea_id),
        1
      )
    },
    tareaAgregada(state, action) {
      const orden = action.payload.orden ?? state[action.payload.to_id].lista.length
      state[action.payload.to_id].lista.splice(orden, 0, action.payload.tarea_id)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(creada, (state, action) => {
        state[action.payload.listaId].lista.push(action.payload.id) 
      })
      .addCase(eliminada, (state, action) => {
        for (let t in state) {
          const index = state[t].lista.indexOf(action.payload)
          if (index > -1) {
            state[t].lista.splice(index, 1)
          }
        }
      })
  }
})

export const {
  listaCreada,
  tareaQuitada,
  tareaAgregada
} = tableroSlice.actions


// Escribimos la lógica de mover una tarea en forma de "thunk",
// que lanza a su vez las acciones de quitar la tarea de un
// tablero y agregarla a otro.
// La función `tareaMovidaDerecha` es un "thunk action creator", que una vez
// que se llama con parámetros devuelve un "thunk". Los "thunks" se
// pueden despachar igual que las acciones, con dispatch().
export const tareaMovidaDerecha = tarea_id => (dispatch, getState) => {
  // Consultar el tablero actual
  const tablero = getState().tablero
  // Encontrar la lista a la que pertenece la tarea
  const from_index = Object.values(tablero).findIndex(v => v.lista.includes(tarea_id))
  // Calcular la siguiente lista
  const to_index = from_index + 1
  // Solo movemos si existe una lista más a la derecha
  if (to_index < Object.keys(tablero).length) {
    const [from_id, to_id] = Object.keys(tablero).slice(from_index, to_index + 1)
    dispatch(tareaQuitada({ tarea_id, from_id }))
    dispatch(tareaAgregada({ tarea_id, to_id }))
  }
}
export const tareaMovidaIzquierda = tarea_id => (dispatch, getState) => {
  const tablero = getState().tablero
  const from_index = Object.values(tablero).findIndex(v => v.lista.includes(tarea_id))
  const to_index = from_index - 1
  if (to_index >= 0) {
    const [to_id, from_id] = Object.keys(tablero).slice(to_index, from_index + 1)
    dispatch(tareaQuitada({ tarea_id, from_id }))
    dispatch(tareaAgregada({ tarea_id, to_id }))
  }
}

export default tableroSlice.reducer