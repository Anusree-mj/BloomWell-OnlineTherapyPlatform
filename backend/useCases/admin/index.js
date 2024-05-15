import { authAdmin } from './adminAuth/adminAuthController.js'
import {
    getClientsDetailsController,
    deleteClientController,
    editClientController,
} from './clientManagement/manageClientController.js'

const adminControllers = {
    authAdmin,
    getClientsDetailsController,
    deleteClientController,
    editClientController,
}

export default adminControllers
