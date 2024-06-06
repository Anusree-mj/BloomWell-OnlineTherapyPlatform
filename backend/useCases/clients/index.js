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

const clientControllers = {
    signUp,
    saveClientData,
    getConnectionController,
    getPaymentDetails,
    postPaymentDetails,
    getClientData,
    postConnectionController,
    getOngoingActivitiesController,
}

export default clientControllers;
