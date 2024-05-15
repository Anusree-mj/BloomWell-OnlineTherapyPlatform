import { authAdmin } from './adminAuth/adminAuthController.js'
import { getClientsDetailsController } from './clientManagement/manageClientController.js'

const adminControllers = {
    authAdmin,
    getClientsDetailsController,
}

export default adminControllers
