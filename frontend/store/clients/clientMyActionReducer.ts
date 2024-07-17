import { createSlice } from "@reduxjs/toolkit";
import { BookedSlotsItems } from "./type";

export interface clientMyActivityStateType {
    slots: string[];
    availableFrom: string;
    availableTo: string;
    bookedSlot: BookedSlotsItems;
    ongoingActivities: BookedSlotsItems[];
    isLoading: boolean;
    error: any;
}

const initialState: clientMyActivityStateType = {
    isLoading: false,
    error: null,
    slots: [],
    availableFrom: "",
    availableTo: "",
    bookedSlot: {
        therapistId: "",
        date: "",
        time: "",
        verificationStatus: "",
        status: "",
        _id: "",
        sessionStart: "",
        sessionEnd: "",
        sessionDuration: ""
    },
    ongoingActivities: []
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
            state.ongoingActivities = action.payload;
        },
        getClientOngoingActivityFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get available slots
        getAvailableSlotsAction: (state) => {
            state.isLoading = true;
        },
        getAvailableSlotsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.slots = action.payload.slots;
            state.availableFrom = action.payload.availableFrom;
            state.availableTo = action.payload.availableTo;
        },
        getAvailableSlotsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get booked slots details
        getBookedSlotsDetailsAction: (state) => {
            state.isLoading = true;
        },
        getBookedSlotsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.bookedSlot = action.payload;
        },
        getBookedSlotsDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})
export const {
    getClientOngoingActivityAction,
    getClientOngoingActivityFailureAction,
    getClientOngoingActivitySuccessAction,

    getAvailableSlotsAction,
    getAvailableSlotsFailureAction,
    getAvailableSlotsSuccessAction,

    getBookedSlotsDetailsAction,
    getBookedSlotsDetailsFailureAction,
    getBookedSlotsDetailsSuccessAction,


} = clientMyActivitySlice.actions;