import { createSlice } from "@reduxjs/toolkit";

import { TherapistItem, LicenseDetails } from '../type'

export interface therapistStateType {
    therapist: TherapistItem;
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
        verificationStatus: ""
    },
    isLoading: false,
    error: null
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
        getTherapistProfileAction: (state) => {
            console.log('entered in profile action')
            state.isLoading = true;
        },
        getTherapistProfileSuccessAction: (state, action) => {
            console.log('reached profile success avtiondd')
            state.isLoading = false;
            state.therapist = action.payload;
            console.log(state.therapist,'therapist found in reducer')
        },
        getTherapistProfileFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
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
    getTherapistProfileAction,
    getTherapistProfileFailureAction,
    getTherapistProfileSuccessAction,
} = therapistSlice.actions;