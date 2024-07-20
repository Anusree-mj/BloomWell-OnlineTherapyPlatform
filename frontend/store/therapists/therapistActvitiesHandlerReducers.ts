import { createSlice } from "@reduxjs/toolkit";

import { ConnectionItems, PaymentDetailsItem } from "../admin/type";
import { ReviewItems, ScheduleItems } from "./type";
import { ClientItem } from "../clients/type";

export interface ActivitiesStateType {
    connections: ConnectionItems[];
    payments: PaymentDetailsItem[];
    reviews: ReviewItems[];
    client: ClientItem;
    schedules: ScheduleItems[];
    isLoading: boolean;
    error: any;
}

const initialState: ActivitiesStateType = {
    isLoading: false,
    error: null,
    connections: [],
    reviews: [],
    client: {
        _id: "",
        name: "",
        email: "",
        type: "",
        age: "",
        questionnaire: [],
        sessionType: "",
        isConnected: false,
        isAnUser: false,
        isSubscribed: false,
        isBlocked: false,
        connectionDetails: {
            _id: "",
            isActive: false,
            createdAt: "",
            updatedAt: ""
        },
        therapistDetails: {
            _id: "",
            name: ""
        },
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
        activeSlotId: "",
        description: "",
        remarks: ""
    },
    schedules: [],
    payments: []
}
export const therapistActivitiesSlice: any = createSlice({
    name: "therapistActivities",
    initialState: initialState,
    reducers: {
        // get connectionrequests
        getTherapistsConnectionRequestAction: (state) => {
            state.isLoading = true;
        },
        getTherapistsConnectionRequestSuccessAction: (state, action) => {
            state.isLoading = false;
            state.connections = action.payload;
            console.log('connectionsssssgot',state.connections)
        },
        getTherapistsConnectionRequestFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get rejected connections requests
        getTherapistsRejectedConnectionsAction: (state) => {
            state.isLoading = true;
        },

        // get active connections
        getTherapistsActiveConnectionsAction: (state) => {
            state.isLoading = true;
        },

        // get inactive connections
        getTherapistsInActiveConnectionsAction: (state) => {
            state.isLoading = true;
        },

        // get reviews 
        getTherapistsReviewsAction: (state) => {
            state.isLoading = true;
        },
        getTherapistsReviewsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload;
        },
        getTherapistsReviewsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get schedules 
        getTherapistsSchedulesAction: (state) => {
            state.isLoading = true;
        },
        getTherapistsSchedulesSuccessAction: (state, action) => {
            state.isLoading = false;
            state.schedules = action.payload;
        },
        getTherapistsSchedulesFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get payments 
        getTherapistsAllPaymentAction: (state) => {
            state.isLoading = true;
        },
        getTherapistsAllPaymentSuccessAction: (state, action) => {
            state.isLoading = false;
            state.payments = action.payload;
        },
        getTherapistsAllPaymentFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})
export const {
    getTherapistsConnectionRequestAction,
    getTherapistsConnectionRequestSuccessAction,
    getTherapistsConnectionRequestFailureAction,
    getTherapistsRejectedConnectionsAction,
    getTherapistsActiveConnectionsAction,
    getTherapistsInActiveConnectionsAction,
    getTherapistsReviewsAction,
    getTherapistsReviewsFailureAction,
    getTherapistsReviewsSuccessAction,
    getTherapistsSchedulesAction,
    getTherapistsSchedulesFailureAction,
    getTherapistsSchedulesSuccessAction,
    getTherapistsAllPaymentAction,
    getTherapistsAllPaymentFailureAction,
    getTherapistsAllPaymentSuccessAction,
} = therapistActivitiesSlice.actions;