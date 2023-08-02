import { configureStore } from "@reduxjs/toolkit";
import tareas from "../slices/tareasSlice";

export const store = configureStore({
    reducer: { tareas }
})