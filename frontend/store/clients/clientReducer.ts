import { createSlice } from "@reduxjs/toolkit";

import { ClientItem } from '../type'

export interface clientStateType {
    client: ClientItem;
    isLoading: boolean;
    error: any;
}

const initialState: clientStateType = {
    client: {
        id: '',
        name: '',
        email: '',
        type: "",
        questionnaires: []
    },
    isLoading: false,
    error: null
}

export const clientSlice: any = createSlice({
    name: "client",
    initialState: initialState,
    reducers: {
        // sgnup action
        getSignUpAction: (state) => {
            console.log('entered in SignUp action')
            state.isLoading = true;
        },
        getSignUpSuccessAction: (state, action) => {
            state.isLoading = false;
            state.client = action.payload;
        },
        getSignUpFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
    }
})
export const {
    getSignUpAction,
    getSignUpSuccessAction,
    getSignUpFailureAction
} = clientSlice.actions;