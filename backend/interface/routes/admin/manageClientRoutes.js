import express from 'express'
const router = express.Router();
import { protectAdmin } from '../../middlewares/adminAuthMiddleware.js';
import controllers from '../../../useCases/index.js'
import adminControllers from '../../../useCases/admin/index.js';

// get client details
router.get('/view', protectAdmin, controllers.adminControllers.getClientsDetailsController);
// delete client
router.delete('/:clientId', protectAdmin, controllers.adminControllers.deleteClientController);

// edit client
router.put('/:clientId', protectAdmin, controllers.adminControllers.editClientController)

export default router;