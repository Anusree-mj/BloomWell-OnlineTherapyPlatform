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
    expirationDate: new Date()
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
        verificationStatus: "",
        gender: ''
    },
    isLoading: false,
    error: null,
    reviews: [{
        comments: "",
        clientName: "",
    }],
    ratings: 0
}
export const therapistSlice: any = createSlice({
    name: "therapist",
    initialState: initialState,
    reducers: {
        // sgnup action
        getTherapistSignUpAction: (state) => {
            console.log('entered in SignUp action')
            state.isLoading = true;
        },
        getTherapistSignUpSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapist = action.payload;
        },
        getTherapistSignUpFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
        // save details
        saveTherapistDetailsAction: (state) => {
            console.log('entered in SignUp action')
            state.isLoading = true;
        },
        saveTherapistDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.therapist = action.payload;
        },
        saveTherapistDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
        // get therapist profile
        getTherapistDetailsAction: (state) => {
            console.log('entered in profile action')
            state.isLoading = true;
        },
        getTherapistDetailsSuccessAction: (state, action) => {
            console.log('reached profile success avtiondd')
            state.isLoading = false;
            state.therapist = action.payload.therapist;
            state.ratings = action.payload.ratings;
            state.reviews = action.payload.reviews;
            console.log(state.therapist, 'therapist found in reducer')
        },
        getTherapistDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get therapistDetails
        getTherapistProfileAction: (state) => {
            state.isLoading = true;
        },
        getTherapistProfileSuccessAction: (state, action) => {
            console.log('reached profile success avtiondd')
            state.isLoading = false;
            state.therapist = action.payload;
            console.log(state.therapist, 'therapist found in reducer')
        },
        getTherapistProfileFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found in profile details', state.error)
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