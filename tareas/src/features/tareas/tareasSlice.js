import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cliente from "../api/api";

// El initialState puede ser el valor de estado inicial o bien una
// función que genere el estado inicial al llamarla, por ejemplo,
// leyendo desde localStorage
const initialState = { status: "LOADING", tareas: {} };

export const tareasCargadas = createAsyncThunk(
  "tareas/tareasCargadas",
  async () => await cliente.tareas.get()
);
export const tareaCreada = createAsyncThunk(
  "tareas/creada",
  async ({ titulo, lista }) => await cliente.tareas.post({ titulo, lista })
);
export const tareaEliminada = createAsyncThunk(
  "tareas/eliminada",
  async (id) => await cliente.tareas.delete(id)
);
export const tareaMovida = createAsyncThunk(
  "tareas/movida",
  async ({ id, lista }) => await cliente.tareas.patch(id, { lista })
);
export const tareaRenombrada = createAsyncThunk(
  "tareas/renombrada",
  async ({ id, titulo }) => await cliente.tareas.patch(id, { titulo })
);

// La herramienta createSlice nos facilita la creación de acciones
// y el reducer principal de la slice simplemente indicando reducers
// individuales nombrados como las acciones que queremos procesar
const tareasSlice = createSlice({
  name: "tareas",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(tareasCargadas.fulfilled, (state, action) => {
        for (let tarea of action.payload) {
          state.tareas[tarea.id] = { titulo: tarea.titulo };
        }
        state.status = "SUCCESS";
      })
      .addCase(tareasCargadas.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(tareasCargadas.rejected, (state) => {
        state.status = "FAILED";
      })
      .addCase(tareaCreada.fulfilled, (state, action) => {
        state.tareas[action.payload.id] = {
          titulo: action.payload.titulo,
        };
      })
      .addCase(tareaEliminada.fulfilled, (state, action) => {
        delete state.tareas[action.meta.arg];
      })
      .addCase(tareaRenombrada.fulfilled, (state, action) => {
        state.tareas[action.payload.id].titulo = action.payload.titulo;
      });
  },
});

export default tareasSlice.reducer;
