import { configureStore } from "@reduxjs/toolkit";
import flagSlice from "./slices/flagSlice";
import messageSlice from "./slices/messageSlice";
import isLoggedSlice from "./slices/isLoggedSlice";
import cartSlice from "./slices/cartSlice";
import subtotalSlice from "./slices/subtotalSlice";

export const store = configureStore({
    reducer: {
        modalFlag: flagSlice,
        message: messageSlice,
        login: isLoggedSlice,
        cart: cartSlice,
        subtotal: subtotalSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
