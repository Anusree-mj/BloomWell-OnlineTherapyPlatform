import { createSlice } from "@reduxjs/toolkit";

import { ClientItem } from '../type'

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
        questionnaires: [],
        isBlocked: false,
        age: ""
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
       
    }
})
export const {
    getClientSignUpAction,
    getClientSignUpSuccessAction,
    getClientSignUpFailureAction,
    saveClientDetailsAction,
    saveClientDetailsFailureAction,
    saveClientDetailsSuccessAction,
   
    
} = clientSlice.actions;