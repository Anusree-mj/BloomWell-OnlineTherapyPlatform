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

const clientControllers = {
    signUp,
    saveClientData,
    getConnectionController,
    getPaymentDetails,
    postPaymentDetails,
    getClientData,
    postConnectionController,
    
}

export default clientControllers;
