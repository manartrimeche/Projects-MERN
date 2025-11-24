import { configureStore } from "@reduxjs/toolkit";
import caractersReducer from "./caractersSlice";
export const store = configureStore({
    reducer: {
        caracters: caractersReducer,
    },
});