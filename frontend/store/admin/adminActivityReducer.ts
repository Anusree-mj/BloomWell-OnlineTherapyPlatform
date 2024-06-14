import { createSlice } from "@reduxjs/toolkit";

import { FeedBackItems, DashboardItems } from "./type";

export interface adminActivitiesStateType {
    dashboardDetails: DashboardItems;
    feedbacks: FeedBackItems[];
    isLoading: boolean;
    error: any;
}

const initialState: adminActivitiesStateType = {
    isLoading: false,
    error: null,
    feedbacks: [],
    dashboardDetails: {
        totalClients: 0,
        totalSubscribedClients: 0,
        totalTherapists: 0,
        totalActiveTherapists: 0
    }
}
export const adminActivitiesSlice: any = createSlice({
    name: "adminActivities",
    initialState: initialState,
    reducers: {

        // get feedbacks
        getAllFeedbacksAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getAllFeedbacksSuccessAction: (state, action) => {
            state.isLoading = false;
            state.feedbacks = action.payload;
        },
        getAllFeedbacksFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
        // get dashboard details
        getDashboardDetailsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getDashboardDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.dashboardDetails = action.payload;
        },
        getDashboardDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

    }
})
export const {
    getAllFeedbacksAction,
    getAllFeedbacksSuccessAction,
    getAllFeedbacksFailureAction,
    getDashboardDetailsAction,
    getDashboardDetailsFailureAction,
    getDashboardDetailsSuccessAction
} = adminActivitiesSlice.actions;