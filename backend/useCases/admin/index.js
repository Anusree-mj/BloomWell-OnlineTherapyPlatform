import { authAdmin } from './adminAuth/adminAuthController.js'
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


} from './therapistManagement/manageTherapistController.js'

import {
    manageConnectionRequestController,
    getAllConnectionRequestController,
} from './therapistManagement/manageConnectionRequests.js'

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
}

export default adminControllers
