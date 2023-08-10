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
    listaEliminada(state, action) {
      delete state[action.payload];
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
    tableroRenombrado(state, action) {
      console.log(action);
      state[action.payload.listaId].nombre = action.payload.nombre;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(creada, (state, action) => {
      state[action.payload.listaId].lista.push(action.payload.id);
    });
    builder.addCase(eliminada, (state, action) => {
      console.log("eliminada", action);
      for (let t in state) {
        const index = state[t].lista.indexOf(action.payload);
        if (index > -1) {
          state[t].lista.splice(index, 1);
        }
      }
    });
  },
});

export const {
  listaCreada,
  tareaQuitada,
  tareaAgregada,
  tableroRenombrado,
  listaEliminada,
} = tableroSlice.actions;

export const tableroEliminado = (listaId) => (dispatch, getState) => {
  const tablero = getState().tablero[listaId];
  console.log(tablero.lista);

  for (const tareaId of tablero.lista) {
    console.log("Elimino tarea " + tareaId);
    dispatch(eliminada(tareaId));
  }

  dispatch(listaEliminada(listaId));
};

export default tableroSlice.reducer;
