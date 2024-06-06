import { createSlice } from "@reduxjs/toolkit";

import { ClientMyActivityItem } from '../type'

export interface clientMyActivityStateType {
    myActivity: ClientMyActivityItem ;
    isLoading: boolean;
    error: any;
}

const initialState: clientMyActivityStateType = {
    myActivity: {
        therapistName: '',
        isActive: false
    },
    isLoading: false,
    error: null,
}

export const clientMyActivitySlice: any = createSlice({
    name: "clientMyActivity",
    initialState: initialState,
    reducers: {
        // get ongoing activities
        getClientOngoingActivityAction: (state) => {
            state.isLoading = true;
        },
        getClientOngoingActivitySuccessAction: (state, action) => {
            state.isLoading = false;
            state.myActivity = action.payload;
        },
        getClientOngoingActivityFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

    }
})
export const {
    getClientOngoingActivityAction,
    getClientOngoingActivityFailureAction,
    getClientOngoingActivitySuccessAction,
   
} = clientMyActivitySlice.actions;