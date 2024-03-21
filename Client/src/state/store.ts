import { configureStore } from "@reduxjs/toolkit";
import flagSlice from "./flag/flagSlice";

export const store = configureStore({
    reducer: {
        flag: flagSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
