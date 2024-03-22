import { configureStore } from "@reduxjs/toolkit";
import flagSlice from "./slices/flagSlice";
import messageSlice from "./slices/messageSlice";

export const store = configureStore({
    reducer: {
        flag: flagSlice,
        message: messageSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
