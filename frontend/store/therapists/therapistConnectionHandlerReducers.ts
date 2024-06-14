import { createSlice } from "@reduxjs/toolkit";

import { ConnectionItems } from "../admin/type";

export interface connectionStateType {
    connections: ConnectionItems[];
    isLoading: boolean;
    error: any;
}


const initialState: connectionStateType = {
    isLoading: false,
    error: null,
    connections: []
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

        // get rejected connections requests
        getTherapistsRejectedConnectionsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getTherapistsRejectedConnectionsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.connections = action.payload;
        },
        getTherapistsRejectedConnectionsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get active connections
        getTherapistsActiveConnectionsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getTherapistsActiveConnectionsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.connections = action.payload;
        },
        getTherapistsActiveConnectionsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get inactive connections
        getTherapistsInActiveConnectionsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getTherapistsInActiveConnectionsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.connections = action.payload;
        },
        getTherapistsInActiveConnectionsFailureAction: (state, action) => {
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
    getTherapistsRejectedConnectionsAction,
    getTherapistsRejectedConnectionsFailureAction,
    getTherapistsRejectedConnectionsSuccessAction,
    getTherapistsActiveConnectionsAction,
    getTherapistsActiveConnectionsFailureAction,
    getTherapistsActiveConnectionsSuccessAction,
    getTherapistsInActiveConnectionsAction,
    getTherapistsInActiveConnectionsFailureAction,
    getTherapistsInActiveConnectionsSuccessAction,
} = therapistConnectionSlice.actions;