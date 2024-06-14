import { createSlice } from "@reduxjs/toolkit";

import { FeedBackItems } from "./type";

export interface adminActivitiesStateType {
    feedbacks: FeedBackItems[];
    isLoading: boolean;
    error: any;
}

const initialState: adminActivitiesStateType = {
    isLoading: false,
    error: null,
    feedbacks: []
}
export const adminActivitiesSlice: any = createSlice({
    name: "adminActivities",
    initialState: initialState,
    reducers: {

        // get connectionrequests
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

    }
})
export const {
    getAllFeedbacksAction,
    getAllFeedbacksSuccessAction,
    getAllFeedbacksFailureAction,
} = adminActivitiesSlice.actions;