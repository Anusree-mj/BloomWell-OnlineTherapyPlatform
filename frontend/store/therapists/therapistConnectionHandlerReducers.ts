import { createSlice } from "@reduxjs/toolkit";

import { ConnectionItems } from '../type'

export interface connectionStateType {
    connections:ConnectionItems[];
    isLoading: boolean;
    error: any;
}


const initialState: connectionStateType = {
    connections: [{
        name: "",
        email: "",
        questionnaires: []
    }],
    isLoading: false,
    error: null,
}
export const therapistConnectionSlice: any = createSlice({
    name: "therapistConnectionRequests",
    initialState: initialState,
    reducers: {
        // get connectionrequests
        getTherapistsConnectionRequestAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getTherapistsConnectionRequestSuccessAction: (state, action) => {
            state.isLoading = false;
            state.connections = action.payload;
        },
        getTherapistsConnectionRequestFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
       
    }
})
export const {
    getTherapistsConnectionRequestAction,
    getTherapistsConnectionRequestSuccessAction,
    getTherapistsConnectionRequestFailureAction,    
} = therapistConnectionSlice.actions;