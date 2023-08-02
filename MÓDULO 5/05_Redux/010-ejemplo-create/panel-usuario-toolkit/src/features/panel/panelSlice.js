// DUX pattern
import { createSlice } from "@reduxjs/toolkit";

const initialState = { usuario: null }

const panelSlice = createSlice({
    name: "panel",
    initialState,
    reducers: {
        sesionIniciada(state, action) {
            // immer
            state.usuario = action.payload.usuario
        },
        sesionCerrada(state) {
            // immer
            state.usuario = null
        }
    }
})

export const { sesionIniciada, sesionCerrada } = panelSlice.actions;
export default panelSlice.reducer;