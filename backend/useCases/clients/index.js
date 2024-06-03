import {
    signUp,
    saveClientData,
    getClientData
} from "./clientAuth/clientAuthController.js"

import {
    getConnections
} from "./clientConnection/clientConnectionController.js";

import {
    getPaymentDetails,
    postPaymentDetails

} from "./payments/paymentController.js";

const clientControllers = {
    signUp,
    saveClientData,
    getConnections,
    getPaymentDetails,
    postPaymentDetails,
    getClientData
}

export default clientControllers;
