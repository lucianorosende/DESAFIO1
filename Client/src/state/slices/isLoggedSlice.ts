import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoggedState {
    value: boolean | null;
}

const initialState: LoggedState = {
    value: null,
};

const LoggedSlice = createSlice({
    name: "logged-state",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<boolean | null>) => {
            state.value = action.payload;
        },
    },
});

export const { login } = LoggedSlice.actions;
export default LoggedSlice.reducer;
