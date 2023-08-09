import { createSlice } from "@reduxjs/toolkit";
import { creada, eliminada } from "../tareas/tareasSlice";

const initialState = {
  todo: {
    nombre: "Pendiente",
    lista: [2, 3],
  },
  doing: {
    nombre: "En proceso",
    lista: [1],
  },
  done: {
    nombre: "Completado",
    lista: [],
  },
};

const tableroSlice = createSlice({
  name: "tablero",
  initialState,
  reducers: {
    listaCreada: {
      reducer(state, action) {
        state[action.payload.id] = {
          nombre: action.payload.nombre,
          lista: [],
        };
      },
      prepare(nombre) {
        return { payload: { id: nanoid(), nombre } };
      },
    },
    tareaQuitada(state, action) {
      state[action.payload.from_id].lista.splice(
        state[action.payload.from_id].lista.indexOf(action.payload.tarea_id),
        1
      );
    },
    tareaAgregada(state, action) {
      const orden =
        action.payload.orden ?? state[action.payload.to_id].lista.length;
      state[action.payload.to_id].lista.splice(
        orden,
        0,
        action.payload.tarea_id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(creada, (state, action) => {
      state[action.payload.listaId].lista.push(action.payload.id);
    });
    builder.addCase(eliminada, (state, action) => {
      for (let t in state) {
        const index = state[t].lista.indexOf(action.payload);
        if (index > -1) {
          state[t].lista.splice(index, 1);
        }
      }
    });
  },
});

export const { listaCreada, tareaQuitada, tareaAgregada } =
  tableroSlice.actions;
export default tableroSlice.reducer;
