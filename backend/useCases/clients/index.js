
import {
    signUp,
    saveClientData,
    getClientData,
    // googleSignup,
} from "./clientAuth/clientAuthController.js"

import {
    getConnectionController,
    postConnectionController,
    disconnectController,
} from "./clientConnection/clientConnectionController.js";

import {
    getPaymentDetails,
    postPaymentDetails,
    cancelSubscription

} from "./payments/paymentController.js";

import {
    getOngoingActivitiesController,
    addFeedbackController,
} from "./clientActivitiesController/clientActivityController.js";

import {
    editPersonalInfoController,
    editMedicalInfoController,
    changePasswordController,

} from "./clientProfile/profileController.js";

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
    // googleSignup,
}

export default clientControllers;
