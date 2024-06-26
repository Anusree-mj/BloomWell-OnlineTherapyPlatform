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
            console.log('entered in ClientSignUp action')
            state.isLoading = true;
        },
        getClientSignUpSuccessAction: (state, action) => {
            state.isLoading = false;
            state.client = action.payload;
        },
        getClientSignUpFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // save details
        saveClientDetailsAction: (state) => {
            console.log('entered in SignUp action')
            state.isLoading = true;
        },
        saveClientDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.client = action.payload;
        },
        saveClientDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get client details
        getClientDetailsAction: (state) => {
            state.isLoading = true;
        },
        getClientDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            console.log('client details:', action.payload)
            state.client = action.payload;
        },
        getClientDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
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
            console.log('client details:', action.payload)
            state.client = action.payload;
        },
        getAnyClientDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
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