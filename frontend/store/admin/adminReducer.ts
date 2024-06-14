import { createSlice } from "@reduxjs/toolkit";

import { AdminItem } from "./type";
import { ClientItem } from "../clients/type";
import { TherapistItem } from "../therapists/type";

export interface adminStateType {
    admin: AdminItem;
    clients: ClientItem[];
    client: ClientItem;
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
    error: null,
    client: {
        _id: "",
        name: "",
        email: "",
        type: "",
        age: "",
        questionnaire: [],
        sessionType: "",
        isConnected: false,
        isAnUser: false,
        isSubscribed: false,
        isBlocked: false,
        connectionDetails: {
            _id: "",
            isActive: false,
            createdAt: "",
            updatedAt: ""
        },
        therapistDetails: {
            _id: "",
            name: ""
        },
        subscription: {
            stripeCustomerId: "",
            stripeSubscriptionId: "",
            stripePriceId: "",
            stripeCurrentPeriodEnd: "",
            stripeCurrentPeriodStart: "",
            stripeTrialEnd: "",
            amount: 0,
            status: ""
        }
    }
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
        getAllClientsDetailsAction: (state) => {
            console.log('entered in get client details action')
            state.isLoading = true;
        },
        getAllClientsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.clients = action.payload;
        },
        getAllClientsDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
        // get single client
        getSingleClientsDetailsAction: (state) => {
            console.log('entered in get client details action')
            state.isLoading = true;
        },
        getSingleClientsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.client = action.payload;
            console.log('clients got in single client action', state.clients)
        },
        getSingleClientsDetailsFailureAction: (state, action) => {
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

        // get rejected therapists details
        getRejectedTherapistsDetailsAction: (state) => {
            console.log('entered in get therapists details action')
            state.isLoading = true;
        },
        getRejectedTherapistsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            console.log('action payload in successaction', action.payload)
            state.therapists = action.payload;
        },
        getRejectedTherapistsDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get therapists who quit
        getTherapistsWhoQuitAction: (state) => {
            console.log('entered in get therapists details action')
            state.isLoading = true;
        },
        getTherapistsWhoQuitSuccessAction: (state, action) => {
            state.isLoading = false;
            console.log('action payload in successaction', action.payload)
            state.therapists = action.payload;
        },
        getTherapistsWhoQuitFailureAction: (state, action) => {
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
    getAllClientsDetailsAction,
    getAllClientsDetailsSuccessAction,
    getAllClientsDetailsFailureAction,
    getTherapistsDetailsAction,
    getTherapistsDetailsSuccessAction,
    getTherapistsDetailsFailureAction,
    getRejectedTherapistsDetailsAction,
    getRejectedTherapistsDetailsFailureAction,
    getRejectedTherapistsDetailsSuccessAction,
    getSingleClientsDetailsAction,
    getSingleClientsDetailsFailureAction,
    getSingleClientsDetailsSuccessAction,
    getTherapistsWhoQuitAction,
    getTherapistsWhoQuitFailureAction,
    getTherapistsWhoQuitSuccessAction,



} = adminSlice.actions;