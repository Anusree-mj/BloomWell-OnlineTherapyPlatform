import { createSlice } from "@reduxjs/toolkit";

import { FeedBackItems, DashboardItems, TherapyCountItems, TopTherapistsItem } from "./type";

export interface adminActivitiesStateType {
    dashboardDetails: DashboardItems;
    feedbacks: FeedBackItems[];
    therapyCount: TherapyCountItems[];
    topTherapists: TopTherapistsItem[];
    isLoading: boolean;
    error: any;
}

const initialState: adminActivitiesStateType = {
    isLoading: false,
    error: null,
    feedbacks: [],
    dashboardDetails: {} as DashboardItems,
    therapyCount: [],
    topTherapists: []
}
export const adminActivitiesSlice: any = createSlice({
    name: "adminActivities",
    initialState: initialState,
    reducers: {

        // get feedbacks
        getAllFeedbacksAction: (state) => {
            state.isLoading = true;
        },
        getAllFeedbacksSuccessAction: (state, action) => {
            state.isLoading = false;
            state.feedbacks = action.payload;
        },
        getAllFeedbacksFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // get dashboard details
        getDashboardDetailsAction: (state) => {
            state.isLoading = true;
        },
        getDashboardDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.dashboardDetails = action.payload;
        },
        getDashboardDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get therapyCounts
        getTherapyCountsAction: (state) => {
            state.isLoading = true;
        },
        getTherapyCountsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapyCount = action.payload;
        },
        getTherapyCountsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
 
        // gettop therapists
        getTopTherapistsAction: (state) => {
            state.isLoading = true;
        },
        getTopTherapistsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.topTherapists = action.payload;
        },
        getTopTherapistsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})
export const {
    getAllFeedbacksAction,
    getAllFeedbacksSuccessAction,
    getAllFeedbacksFailureAction,
    getDashboardDetailsAction,
    getDashboardDetailsFailureAction,
    getDashboardDetailsSuccessAction,
    getTherapyCountsAction,
    getTherapyCountsFailureAction,
    getTherapyCountsSuccessAction,
    getTopTherapistsAction,
    getTopTherapistsSuccessAction,
    getTopTherapistsFailureAction
} = adminActivitiesSlice.actions;