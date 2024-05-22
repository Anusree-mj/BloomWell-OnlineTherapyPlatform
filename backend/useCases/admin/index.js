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
    editTherapistController

} from './therapistManagement/manageTherapistController.js'

const adminControllers = {
    authAdmin,
    getClientsDetailsController,
    deleteClientController,
    editClientController,
    getTherapistsDetailsController,
    verifyTherapistController,
    deleteTherapistController,
    editTherapistController
}

export default adminControllers
