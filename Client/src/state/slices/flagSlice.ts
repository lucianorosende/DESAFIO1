import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
        flag: (state, action: PayloadAction<boolean | null>) => {
            state.value = action.payload;
        },
    },
});

export const { flag } = flagSlice.actions;
export default flagSlice.reducer;
