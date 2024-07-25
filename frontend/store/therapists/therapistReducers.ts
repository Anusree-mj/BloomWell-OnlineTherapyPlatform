import { createSlice } from "@reduxjs/toolkit";

import { TherapistItem, LicenseDetails, ReviewItems } from "./type";

export interface therapistStateType {
    therapist: TherapistItem;
    reviews: ReviewItems[];
    ratings: number;
    isLoading: boolean;
    error: any;
}
const initialLicense: LicenseDetails = {
    licenseNo: "",
    country: "",
    expirationDate: new Date(),
    licenseProof: ""
};
const initialState: therapistStateType = {
    therapist: {
        _id: "",
        name: "",
        email: "",
        phone: 0,
        license: initialLicense,
        role: "",
        expertise: [],
        experience: "",
        description: "",
        image: "",
        isBlocked: false,
        isVerified: false,
        isActive: false,
        verificationStatus: "",
        gender: '',
        totalClients: 0,
        totalLiveSessionPerMonth: 0,
        isMonthlyPaid: false
    },
    isLoading: false,
    error: null,
    reviews: [],
    ratings: 0
}
export const therapistSlice: any = createSlice({
    name: "therapist",
    initialState: initialState,
    reducers: {
        // sgnup action
        getTherapistSignUpAction: (state) => {
            state.isLoading = true;
        },
        getTherapistSignUpSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapist = action.payload;
        },
        getTherapistSignUpFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // save details
        saveTherapistDetailsAction: (state) => {
            state.isLoading = true;
        },
        saveTherapistDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapist = action.payload;
        },
        saveTherapistDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // get therapist profile
        getTherapistDetailsAction: (state) => {
            console.log('therapist details callleddddddddddd')
            state.isLoading = true;
        },
        getTherapistDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapist = action.payload.therapist;
            console.log('therapist detailss got in ')
            state.ratings = action.payload.ratings;
            state.reviews = action.payload.reviews;
        },
        getTherapistDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get therapistDetails
        getTherapistProfileAction: (state) => {
            state.isLoading = true;
        },
        getTherapistProfileSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapist = action.payload;
        },
        getTherapistProfileFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})
export const {
    getTherapistSignUpAction,
    getTherapistSignUpSuccessAction,
    getTherapistSignUpFailureAction,
    saveTherapistDetailsAction,
    saveTherapistDetailsSuccessAction,
    saveTherapistDetailsFailureAction,
    getTherapistDetailsAction,
    getTherapistDetailsFailureAction,
    getTherapistDetailsSuccessAction,
    getTherapistProfileAction,
    getTherapistProfileFailureAction,
    getTherapistProfileSuccessAction,

} = therapistSlice.actions;