import { configureStore } from "@reduxjs/toolkit";
import tareas from "../features/tareas/tareasSlice";
import tablero from "../features/tablero/tableroSlice"

export const store = configureStore({
    reducer: { tareas, tablero }
})