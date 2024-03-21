import { createSlice } from "@reduxjs/toolkit";

interface FlagState {
    value: boolean | null;
}

const initialState: FlagState = {
    value: null,
};

const flagSlice = createSlice({
    name: "flag",
    initialState,
    reducers: {
        flagTrue: (state) => {
            state.value = true;
        },
        flagFalse: (state) => {
            state.value = false;
        },
        resetFlag: (state) => {
            state.value = null;
        },
    },
});

export const { flagTrue, flagFalse, resetFlag } = flagSlice.actions;
export default flagSlice.reducer;
