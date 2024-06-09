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
    postPaymentDetails

} from "./payments/paymentController.js";

import {
    getOngoingActivitiesController
} from "./clientActivitiesController/clientActivityController.js";

import {
    editPersonalInfoController,
    editMedicalInfoController
} from "./clientProfile/profileController.js";

const clientControllers = {
    signUp,
    saveClientData,
    getConnectionController,
    getPaymentDetails,
    postPaymentDetails,
    getClientData,
    postConnectionController,
    getOngoingActivitiesController,
    editPersonalInfoController,
    editMedicalInfoController,
}

export default clientControllers;
