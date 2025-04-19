import { createSlice } from "@reduxjs/toolkit";
import { IPatient, IPatientDetails } from "../../types";

interface patientsState {
    patients: IPatient[];
    selectedPatient: IPatientDetails | null;
    loading: boolean;
    error: string | null;
}
const patientsIntialStatus: patientsState = {
    patients: [],
    selectedPatient: null,
    loading: false,
    error: null,
};
export const patientsSlice = createSlice({
    name: "patientsReducer",
    initialState: patientsIntialStatus,
    reducers: {
        setPatients: (state, action) => {
            state.patients = action.payload;
        },
        setSelectedPatient: (state, action) => {
            state.selectedPatient = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { setPatients, setSelectedPatient, setLoading, setError } = patientsSlice.actions;
export const patientsReducer = patientsSlice.reducer;