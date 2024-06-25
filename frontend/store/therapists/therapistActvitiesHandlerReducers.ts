import { createSlice } from "@reduxjs/toolkit";

import { ConnectionItems } from "../admin/type";
import { ReviewItems } from "./type";
import { ClientItem } from "../clients/type";

export interface ActivitiesStateType {
    connections: ConnectionItems[];
    reviews: ReviewItems[];
    client: ClientItem;
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
        }
    }
}
export const therapistActivitiesSlice: any = createSlice({
    name: "therapistActivities",
    initialState: initialState,
    reducers: {
        // get connectionrequests
        getTherapistsConnectionRequestAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getTherapistsConnectionRequestSuccessAction: (state, action) => {
            state.isLoading = false;
            state.connections = action.payload;
        },
        getTherapistsConnectionRequestFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get rejected connections requests
        getTherapistsRejectedConnectionsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },

        // get active connections
        getTherapistsActiveConnectionsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },

        // get inactive connections
        getTherapistsInActiveConnectionsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },

        // get reviews 
        getTherapistsReviewsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getTherapistsReviewsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload;
        },
        getTherapistsReviewsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
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

  
} = therapistActivitiesSlice.actions;