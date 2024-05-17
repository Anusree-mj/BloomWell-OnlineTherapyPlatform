import { authAdmin } from './adminAuth/adminAuthController.js'
import {
    getClientsDetailsController,
    deleteClientController,
    editClientController,
} from './clientManagement/manageClientController.js'

import {
    getTherapistsDetailsController,
    verifyTherapistController

} from './therapistManagement/manageTherapistController.js'

const adminControllers = {
    authAdmin,
    getClientsDetailsController,
    deleteClientController,
    editClientController,
    getTherapistsDetailsController,
    verifyTherapistController
}

export default adminControllers
