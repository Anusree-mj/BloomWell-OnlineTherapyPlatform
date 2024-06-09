import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import { protect } from '../../../middlewares/authMiddleware.js'

// get client details
router.get('/details', protect('client'), controllers.clientControllers.getClientData)
// get connections
router.get('/connection/:clientId', protect('client'), controllers.clientControllers.getConnectionController)
// post connections
router.post('/connection', protect('client'), controllers.clientControllers.postConnectionController)
// get ongoing activity details
router.get('/myActivity/ongoing', protect('client'), controllers.clientControllers.getOngoingActivitiesController)

// edit profile 
router.put('/profile/personal', protect('client'), controllers.clientControllers.editPersonalInfoController)
router.put('/profile/medical', protect('client'), controllers.clientControllers.editMedicalInfoController)

export default router;