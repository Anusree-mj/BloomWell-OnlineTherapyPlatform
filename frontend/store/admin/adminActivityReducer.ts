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
            console.log('dashboardetails', state.dashboardDetails)
        },
        getDashboardDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get therapyCounts
        getTherapyCountsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getTherapyCountsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapyCount = action.payload;
            console.log('therapyCountdetailssss', state.therapyCount)
        },
        getTherapyCountsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
 
        // gettop therapists
        getTopTherapistsAction: (state) => {
            console.log('entered in  action')
            state.isLoading = true;
        },
        getTopTherapistsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.topTherapists = action.payload;
            console.log('top therapistsssssss', state.topTherapists)
        },
        getTopTherapistsFailureAction: (state, action) => {
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
    getDashboardDetailsSuccessAction,
    getTherapyCountsAction,
    getTherapyCountsFailureAction,
    getTherapyCountsSuccessAction,
    getTopTherapistsAction,
    getTopTherapistsSuccessAction,
    getTopTherapistsFailureAction
} = adminActivitiesSlice.actions;