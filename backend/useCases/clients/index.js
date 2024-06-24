
import {
    signUp,
    saveClientData,
    getClientData,
    googleSignup,
} from "./clientAuthController.js"

import {
    getConnectionController,
    postConnectionController,
    disconnectController,
} from "./clientConnectionController.js";

import {
    getPaymentDetails,
    postPaymentDetails,
    cancelSubscription

} from "./paymentController.js";

import {
    getOngoingActivitiesController,
    addFeedbackController,
    getAnyClientDetailsController
} from "./clientActivityController.js";

import {
    editPersonalInfoController,
    editMedicalInfoController,
    changePasswordController,

} from "./profileController.js";

const clientControllers = {
    signUp,
    saveClientData,
    getConnectionController,
    getPaymentDetails,
    postPaymentDetails,
    cancelSubscription,
    getClientData,
    postConnectionController,
    getOngoingActivitiesController,
    editPersonalInfoController,
    editMedicalInfoController,
    changePasswordController,
    disconnectController,
    addFeedbackController,
    googleSignup,
    getAnyClientDetailsController
}

export default clientControllers;
