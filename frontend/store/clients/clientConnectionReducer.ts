import { createSlice } from "@reduxjs/toolkit";
import { TherapistItem } from "../therapists/type";

export interface clientConnectionStateType {
    therapist: TherapistItem[];
    isLoading: boolean;
    error: any;
}

const initialState: clientConnectionStateType = {
    therapist: [],
    isLoading: false,
    error: null,
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
        },

        // post connection
        postConnectionAction: (state) => {
            state.isLoading = true;
        },
        postConnectionSuccessAction: (state) => {
            state.isLoading = false;
        },
        postConnectionFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})
export const {
    getConnectionsAction,
    getConnectionsFailureAction,
    getConnectionsSuccessAction,
    postConnectionAction,
    postConnectionFailureAction,
    postConnectionSuccessAction,

} = clientConnectionSlice.actions;