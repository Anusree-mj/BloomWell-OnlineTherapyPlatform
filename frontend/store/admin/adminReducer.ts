import { createSlice } from "@reduxjs/toolkit";

import { AdminItem } from '../type'
import { ClientItem } from "../type";
import { TherapistItem } from "../type";

export interface adminStateType {
    admin: AdminItem;
    clients: ClientItem[];
    therapists: TherapistItem[];
    isLoading: boolean;
    error: any;
}

const initialState: adminStateType = {
    admin: {
        _id: '',
        name: '',
        email: '',
    },
    clients: [],
    therapists: [],
    isLoading: false,
    error: null
}

export const adminSlice: any = createSlice({
    name: "admin",
    initialState: initialState,
    reducers: {
        // login action
        getAdminLoginAction: (state) => {
            console.log('entered in AdminLogin action')
            state.isLoading = true;
        },
        getAdminLoginSuccessAction: (state, action) => {
            state.isLoading = false;
            state.admin = action.payload;
        },
        getAdminLoginFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get clients details
        getClientsDetailsAction: (state) => {
            console.log('entered in get client details action')
            state.isLoading = true;
        },
        getClientsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.clients = action.payload;
        },
        getClientsDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get therapists details
        getTherapistsDetailsAction: (state) => {
            console.log('entered in get therapists details action')
            state.isLoading = true;
        },
        getTherapistsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            console.log('action payload in successaction', action.payload)
            state.therapists = action.payload;
        },
        getTherapistsDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
    }
})
export const {
    getAdminLoginAction,
    getAdminLoginSuccessAction,
    getAdminLoginFailureAction,
    getClientsDetailsAction,
    getClientsDetailsSuccessAction,
    getClientsDetailsFailureAction,
    getTherapistsDetailsAction,
    getTherapistsDetailsSuccessAction,
    getTherapistsDetailsFailureAction,
} = adminSlice.actions;