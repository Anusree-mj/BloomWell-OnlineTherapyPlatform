import { createSlice } from "@reduxjs/toolkit";
import { ClientOngoingActivityItem } from "./type";

export interface clientMyActivityStateType {
    connectionDetails: {
        therapistName: '',
        isActive: boolean
    };
    ongoingActivity: ClientOngoingActivityItem[];
    isLoading: boolean;
    error: any;
}

const initialState: clientMyActivityStateType = {
    connectionDetails: {
        therapistName: "",
        isActive: false
    },
    ongoingActivity: [],
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
            state.connectionDetails = action.payload;
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