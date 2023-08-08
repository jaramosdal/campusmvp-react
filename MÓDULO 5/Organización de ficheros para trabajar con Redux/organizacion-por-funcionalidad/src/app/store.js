import { configureStore } from "@reduxjs/toolkit";
import tareas from "../features/tareas/tareasSlice";

export const store = configureStore({
    reducer: { tareas }
})