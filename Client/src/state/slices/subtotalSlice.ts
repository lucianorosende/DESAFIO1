import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface subtotalState {
    value: number;
}

const initialState: subtotalState = {
    value: 0,
};

const subtotalSlice = createSlice({
    name: "subtotal",
    initialState,
    reducers: {
        subtotal: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { subtotal } = subtotalSlice.actions;
export default subtotalSlice.reducer;
