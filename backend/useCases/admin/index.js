import { authAdmin } from './adminAuth/adminAuthController.js'
import {
    getClientsDetailsController,
    deleteClientController,
    editClientController,
    getSingleClientDetailsController,

} from './clientManagement/manageClientController.js'

import {
    getTherapistsDetailsController,
    verifyTherapistController,
    deleteTherapistController,
    editTherapistController,
    getRejectedTherapistController,
    postRejectedReasonController,
    getTherapistsWhoQuitController,

} from './therapistManagement/manageTherapistController.js'

import {
    manageConnectionRequestController,
    getAllConnectionRequestController,
} from './therapistManagement/manageConnectionRequests.js'

import { getFeedbackControllers } from './adminActivity/adminFeedBackController.js'



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
    getSingleClientDetailsController,
    getTherapistsWhoQuitController,
    getFeedbackControllers,




}

export default adminControllers
