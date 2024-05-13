import { createSlice } from "@reduxjs/toolkit";

import { AdminItem } from '../type'

export interface adminStateType {
    admin: AdminItem;
    isLoading: boolean;
    error: any;
}

const initialState: adminStateType = {
    admin: {
        id: '',
        name: '',
        email: '',
    },
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
    }
})
export const {
    getAdminLoginAction,
    getAdminLoginSuccessAction,
    getAdminLoginFailureAction
} = adminSlice.actions;