import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface cartState {
    value: [];
}

const initialState: cartState = {
    value: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cart: (state, action: PayloadAction<[]>) => {
            state.value = action.payload;
        },
    },
});

export const { cart } = cartSlice.actions;
export default cartSlice.reducer;
