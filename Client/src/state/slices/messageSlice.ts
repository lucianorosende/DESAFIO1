import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MessageState {
    value: string;
}

const initialState: MessageState = {
    value: "",
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        message: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { message } = messageSlice.actions;
export default messageSlice.reducer;
