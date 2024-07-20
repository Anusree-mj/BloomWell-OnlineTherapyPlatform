import { createSlice } from "@reduxjs/toolkit";

import { AdminItem } from "./type";
import { ClientItem } from "../clients/type";
import { TherapistItem } from "../therapists/type";

export interface adminStateType {
    admin: AdminItem;
    clients: ClientItem[];
    client: ClientItem;
    therapists: TherapistItem[];
    paymentDetails: TherapistItem[];
    isLoading: boolean;
    error: any;
}

const initialState: adminStateType = {
    admin: {
        _id: '',
        name: '',
        email: '',
        totalEarnings: 0
    },
    clients: [],
    therapists: [],
    paymentDetails: [],
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
        },
        isActiveSlots: false,
        activeSlotId: "",
        description: "",
        remarks: ""
    }
}

export const adminSlice: any = createSlice({
    name: "admin",
    initialState: initialState,
    reducers: {
        // login action
        getAdminLoginAction: (state) => {
            state.isLoading = true;
        },
        getAdminLoginSuccessAction: (state, action) => {
            state.isLoading = false;
            state.admin = action.payload;
        },
        getAdminLoginFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get clients details
        getAllClientsDetailsAction: (state) => {
            state.isLoading = true;
        },
        getAllClientsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.clients = action.payload;
        },
        getAllClientsDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get therapists details
        getTherapistsDetailsAction: (state) => {
            state.isLoading = true;
        },
        getTherapistsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapists = action.payload;
        },
        getTherapistsDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get rejected therapists details
        getRejectedTherapistsDetailsAction: (state) => {
            state.isLoading = true;
        },
        getRejectedTherapistsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapists = action.payload;
        },
        getRejectedTherapistsDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get therapists who quit
        getTherapistsWhoQuitAction: (state) => {
            state.isLoading = true;
        },
        getTherapistsWhoQuitSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapists = action.payload;
        },
        getTherapistsWhoQuitFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get therapist paymentdetails
        getTherapistsPaymentsAction: (state) => {
            state.isLoading = true;
        },
        getTherapistsPaymentsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.paymentDetails = action.payload.paymentDetails;
            state.admin = action.payload.adminData
        },
        getTherapistsPaymentsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
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

    getTherapistsWhoQuitAction,
    getTherapistsWhoQuitFailureAction,
    getTherapistsWhoQuitSuccessAction,

    getTherapistsPaymentsAction,
    getTherapistsPaymentsFailureAction,
    getTherapistsPaymentsSuccessAction


} = adminSlice.actions;