import { authAdmin } from './adminAuthController.js'
import {
    getClientsDetailsController,
    deleteClientController,
    editClientController,

} from './clientManagement/manageClientController.js'

import {
    getTherapistsDetailsController,
    verifyTherapistController,
    deleteTherapistController,
    editTherapistController,
    getRejectedTherapistController,
    postRejectedReasonController,
    getTherapistsWhoQuitController,
    getPaymentDetailsController,
    placePaymentController,
    verifyPaymentController,
} from './therapistManagement/manageTherapistController.js'

import {
    manageConnectionRequestController,
    getAllConnectionRequestController,
} from './therapistManagement/manageConnectionRequests.js'

import {
    getFeedbackControllers,
    getDashboardDetailsControllers,
    getTherapyCountControllers,
    getTopTherapistsControllers,

} from './adminFeedBackController.js'



const adminControllers = {
    authAdmin,
    getClientsDetailsController,
    deleteClientController,
    editClientController,
    getTherapistsDetailsController,
    verifyTherapistController,
    deleteTherapistController,
    editTherapistController,
    getAllConnectionRequestController,
    manageConnectionRequestController,
    getRejectedTherapistController,
    postRejectedReasonController,
    getTherapistsWhoQuitController,
    getFeedbackControllers,
    getDashboardDetailsControllers,
    getTherapyCountControllers,
    getTopTherapistsControllers,
    getPaymentDetailsController,
    placePaymentController,
    verifyPaymentController,
}

export default adminControllers
