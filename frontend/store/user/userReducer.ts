import { createSlice } from "@reduxjs/toolkit";

import { UserItem } from './type'

export interface userStateType {
    user: UserItem;
    isLoading: boolean;
    error: any;
}

const initialState: userStateType = {
    user: {
        name: '',
        email: '',
        _id: ""
    },
    isLoading: false,
    error: null
}

export const userSlice: any = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // login action
        getLoginAction: (state) => {
            console.log('entered in login action')
            state.isLoading = true;
        },
        getLoginSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        getLoginFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
    }
})
export const {
    getLoginAction,
    getLoginSuccessAction,
    getLoginFailureAction
} = userSlice.actions;