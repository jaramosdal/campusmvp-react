import { configureStore } from "@reduxjs/toolkit";
import tareas from "./tareasSlice";

export const store = configureStore({
    reducer: { tareas }
})