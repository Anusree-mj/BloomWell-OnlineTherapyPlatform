import { createSlice } from "@reduxjs/toolkit";

import { ClientItem } from "./type";
export interface clientStateType {
    client: ClientItem;
    isLoading: boolean;
    error: any;
}

const initialState: clientStateType = {
    client: {
        _id: "",
        name: '',
        email: '',
        type: "",
        isBlocked: false,
        age: "",
        sessionType: "",
        isConnected: false,
        isAnUser: false,
        isSubscribed: false,
        connectionDetails: {
            _id: '',
            isActive: false,
            createdAt: '',
            updatedAt: ''
        },
        therapistDetails: {
            _id: "",
            name: ""
        },
        questionnaire: [],
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
        activeSlotId: ""
    },
    isLoading: false,
    error: null
}

export const clientSlice: any = createSlice({
    name: "client",
    initialState: initialState,
    reducers: {
        // sgnup action
        getClientSignUpAction: (state) => {
            state.isLoading = true;
        },
        getClientSignUpSuccessAction: (state, action) => {
            state.isLoading = false;
            state.client = action.payload;
        },
        getClientSignUpFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // save details
        saveClientDetailsAction: (state) => {
            state.isLoading = true;
        },
        saveClientDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.client = action.payload;
        },
        saveClientDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get client details
        getClientDetailsAction: (state) => {
            state.isLoading = true;
        },
        getClientDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.client = action.payload;
        },
        getClientDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // signin with google action
        getSignInWithGoogleAction: (state) => {
            state.isLoading = true;
        },

        // get any clientdetails
        getAnyClientDetailsAction: (state) => {
            state.isLoading = true;
        },
        getAnyClientDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.client = action.payload;
        },
        getAnyClientDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})
export const {
    getClientSignUpAction,
    getClientSignUpSuccessAction,
    getClientSignUpFailureAction,
    saveClientDetailsAction,
    saveClientDetailsFailureAction,
    saveClientDetailsSuccessAction,
    getClientDetailsAction,
    getClientDetailsFailureAction,
    getClientDetailsSuccessAction,
    getSignInWithGoogleAction,

    getAnyClientDetailsAction,
    getAnyClientDetailsFailureAction,
    getAnyClientDetailsSuccessAction
} = clientSlice.actions;