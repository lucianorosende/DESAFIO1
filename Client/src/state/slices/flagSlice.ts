import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FlagState {
    value: boolean | null;
}

const initialState: FlagState = {
    value: null,
};

const flagSlice = createSlice({
    name: "ModalFlag",
    initialState,
    reducers: {
        modalFlag: (state, action: PayloadAction<boolean | null>) => {
            state.value = action.payload;
        },
    },
});

export const { modalFlag } = flagSlice.actions;
export default flagSlice.reducer;
