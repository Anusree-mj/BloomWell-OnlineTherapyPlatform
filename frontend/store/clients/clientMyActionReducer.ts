import { createSlice } from "@reduxjs/toolkit";
import { ClientOngoingActivityItem, BookedSlotsItems } from "./type";

export interface clientMyActivityStateType {
    connectionDetails: {
        therapistName: '',
        isActive: boolean
    };
    ongoingActivity: ClientOngoingActivityItem[];
    slots: string[];
    availableFrom: string;
    availableTo: string;
    bookedSlot: BookedSlotsItems;
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
    slots: [],
    availableFrom: "",
    availableTo: "",
    bookedSlot: {
        therapistId: "",
        date: "",
        time: "",
        verificationStatus: "",
        status: ""
    }
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
            state.slots = action.payload.slots;
            state.availableFrom = action.payload.availableFrom;
            state.availableTo = action.payload.availableTo;
            console.log('slots got in reducer', state.slots,
                'availableFrom:', state.availableFrom, 'available to:', state.availableTo
            )
        },
        getAvailableSlotsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get booked slots details
        getBookedSlotsDetailsAction: (state) => {
            state.isLoading = true;
        },
        getBookedSlotsDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.bookedSlot = action.payload;
            console.log('slots got in reducer', state.bookedSlot)
        },
        getBookedSlotsDetailsFailureAction: (state, action) => {
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
    getAvailableSlotsSuccessAction,

    getBookedSlotsDetailsAction,
    getBookedSlotsDetailsFailureAction,
    getBookedSlotsDetailsSuccessAction,

} = clientMyActivitySlice.actions;