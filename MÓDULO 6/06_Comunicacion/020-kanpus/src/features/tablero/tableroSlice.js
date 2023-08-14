import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import cliente from "../api/api"
import { tareaCreada, tareaMovida, tareasCargadas, tareaEliminada } from "../tareas/tareasSlice"

const initialState = {
  status: 'LOADING',
  listas: {}
}

export const cargarTablero = createAsyncThunk(
  'tablero/cargarTablero', 
  async () => await cliente.tablero.get()
)
export const listaCreada = createAsyncThunk(
  'tablero/listaCreada',
  async nombre => await cliente.tablero.post({ nombre })
)

const tableroSlice = createSlice({
  name: "tablero",
  initialState,
  reducers: {
    tareaQuitada(state, action) {
      state.listas[action.payload.from_id].lista.splice(
        state.listas[action.payload.from_id].lista.indexOf(action.payload.tarea_id),
        1
      )
    },
    tareaAgregada(state, action) {
      const orden = action.payload.orden ?? state.listas[action.payload.to_id].lista.length
      state.listas[action.payload.to_id].lista.splice(orden, 0, action.payload.tarea_id)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(tareaCreada.fulfilled, (state, action) => {
        state.listas[action.payload.lista].lista.push(action.payload.id)
      })
      .addCase(tareaEliminada.fulfilled, (state, action) => {
        for (let t in state.listas) {
          const index = state.listas[t].lista.indexOf(action.meta.arg)
          if (index > -1) {
            state.listas[t].lista.splice(index, 1)
          }
        }
      })
      .addCase(cargarTablero.pending, state => { 
        state.status = "LOADING" 
      })
      .addCase(cargarTablero.fulfilled, (state, action) => {
        for (let lista of action.payload) {
          state.listas[lista.id] = lista
        }
        state.status = "SUCCESS"
      })
      .addCase(cargarTablero.rejected, state => { 
        state.status = "FAILED"
      })
      .addCase(tareasCargadas.fulfilled, (state, action) => {
        for (let l in state.listas) {
          state.listas[l].lista = []
        }
        for (let tarea of action.payload) {
          state.listas[tarea.lista].lista.push(tarea.id)
        }
      })
      .addCase(listaCreada.fulfilled, (state, action) => {
        state.listas[action.payload.id] = { 
          nombre: action.payload.nombre,
          lista: []
        }
      })
  }
})

const { tareaQuitada, tareaAgregada } = tableroSlice.actions

// Escribimos la lógica de mover una tarea en forma de "thunk",
// que lanza a su vez las acciones de quitar la tarea de un
// tablero y agregarla a otro.
// La función `tareaMovidaDerecha` es un "thunk action creator", que una vez
// que se llama con parámetros devuelve un "thunk". Los "thunks" se
// pueden despachar igual que las acciones, con dispatch().
export const tareaMovidaDerecha = tarea_id => (dispatch, getState) => {
  // Consultar el tablero actual
  const tablero = getState().tablero.listas
  // Encontrar la lista a la que pertenece la tarea
  const from_index = Object.values(tablero).findIndex(v => v.lista.includes(tarea_id))
  // Calcular la siguiente lista
  const to_index = from_index + 1
  // Solo movemos si existe una lista más a la derecha
  if (to_index < Object.keys(tablero).length) {
    const [from_id, to_id] = Object.keys(tablero).slice(from_index, to_index + 1)
    dispatch(tareaMovida({ id: tarea_id, lista: to_id })).then(() => {
      dispatch(tareaQuitada({ tarea_id, from_id }))
      dispatch(tareaAgregada({ tarea_id, to_id }))
    })
  }
}
export const tareaMovidaIzquierda = tarea_id => (dispatch, getState) => {
  const tablero = getState().tablero.listas
  const from_index = Object.values(tablero).findIndex(v => v.lista.includes(tarea_id))
  const to_index = from_index - 1
  if (to_index >= 0) {
    const [to_id, from_id] = Object.keys(tablero).slice(to_index, from_index + 1)
    dispatch(tareaMovida({ id: tarea_id, lista: to_id })).then(() => {
      dispatch(tareaQuitada({ tarea_id, from_id }))
      dispatch(tareaAgregada({ tarea_id, to_id }))
    })
  }
}

export default tableroSlice.reducer