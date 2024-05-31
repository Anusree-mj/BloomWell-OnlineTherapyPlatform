import { createSlice } from "@reduxjs/toolkit";

import { TherapistItem } from '../type'

export interface clientConnectionStateType {
    therapist: TherapistItem[];
    isLoading: boolean;
    error: any;
}

const initialState: clientConnectionStateType = {
    therapist: [],
    isLoading: false,
    error: null
}

export const clientConnectionSlice: any = createSlice({
    name: "clientConnection",
    initialState: initialState,
    reducers: {
        // get connections
        getConnectionsAction: (state) => {
            state.isLoading = true;
        },
        getConnectionsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapist = action.payload;
        },
        getConnectionsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
    }
})
export const {
    getConnectionsAction,
    getConnectionsFailureAction,
    getConnectionsSuccessAction,

} = clientConnectionSlice.actions;