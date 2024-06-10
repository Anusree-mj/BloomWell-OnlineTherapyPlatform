import {
    signUp,
    saveClientData,
    getClientData
} from "./clientAuth/clientAuthController.js"

import {
    getConnectionController,
    postConnectionController,
} from "./clientConnection/clientConnectionController.js";

import {
    getPaymentDetails,
    postPaymentDetails,
    cancelSubscription

} from "./payments/paymentController.js";

import {
    getOngoingActivitiesController
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
}

export default clientControllers;
