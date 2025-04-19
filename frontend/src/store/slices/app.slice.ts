import { createSlice } from "@reduxjs/toolkit";
interface appState {
    live: boolean;
};

const initialState: appState = {
    live: false,
 };
export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setApp: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
})

export const { setApp } = appSlice.actions;
export const appReducer = appSlice.reducer;