import { createSlice } from "@reduxjs/toolkit";
import { ClientOngoingActivityItem } from "./type";

export interface clientMyActivityStateType {
    connectionDetails: {
        therapistName: '',
        isActive: boolean
    };
    ongoingActivity: ClientOngoingActivityItem[];
    slots: string[];
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
    slots: []
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

        // get available slots
        getAvailableSlotsAction: (state) => {
            state.isLoading = true;
        },
        getAvailableSlotsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.slots = action.payload;
            console.log('slots got in reducer', state.slots)
        },
        getAvailableSlotsFailureAction: (state, action) => {
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

    getAvailableSlotsAction,
    getAvailableSlotsFailureAction,
    getAvailableSlotsSuccessAction

} = clientMyActivitySlice.actions;