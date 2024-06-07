import { createSlice } from "@reduxjs/toolkit";

import { ConnectionItems } from "./type";

export interface connectionStateType {
    connections:ConnectionItems[];
    isLoading: boolean;
    error: any;
}


const initialState: connectionStateType = {
    isLoading: false,
    error: null,
    connections: []
}
export const adminConnectionSlice: any = createSlice({
    name: "adminConnectionRequests",
    initialState: initialState,
    reducers: {

        // get connectionrequests
        getAdminConnectionRequestAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getAdminConnectionRequestSuccessAction: (state, action) => {
            state.isLoading = false;
            state.connections = action.payload;
        },
        getAdminConnectionRequestFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
       
    }
})
export const {
    getAdminConnectionRequestAction,
    getAdminConnectionRequestSuccessAction,
    getAdminConnectionRequestFailureAction,    
} = adminConnectionSlice.actions;