import { configureStore } from "@reduxjs/toolkit";
import flagSlice from "./slices/flagSlice";
import messageSlice from "./slices/messageSlice";
import isLoggedSlice from "./slices/isLoggedSlice";

export const store = configureStore({
    reducer: {
        modalFlag: flagSlice,
        message: messageSlice,
        login: isLoggedSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
