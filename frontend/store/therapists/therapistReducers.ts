import { createSlice } from "@reduxjs/toolkit";

import { TherapistItem } from '../type'

export interface therapistStateType {
    therapist: TherapistItem;
    isLoading: boolean;
    error: any;
}

const initialState: therapistStateType = {
    therapist: {
        _id: "",
        name: "",
        email: "",
        phone: 0,
        licenseNum: "",
        role: ""
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
    }
})
export const {
    getTherapistSignUpAction,
    getTherapistSignUpSuccessAction,
    getTherapistSignUpFailureAction
} = therapistSlice.actions;