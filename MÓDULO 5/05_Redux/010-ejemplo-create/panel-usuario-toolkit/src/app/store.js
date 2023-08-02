import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "../features/panel/panelSlice";

export const store = configureStore({
    reducer: {
        panel: panelReducer
    }
})