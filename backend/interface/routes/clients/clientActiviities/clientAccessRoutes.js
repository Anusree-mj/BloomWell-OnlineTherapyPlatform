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
// disconnect connection
router.put('/connection', protect('client'), controllers.clientControllers.disconnectController)
// get ongoing activity details
router.get('/myActivity/ongoing', protect('client'), controllers.clientControllers.getOngoingActivitiesController)

// edit profile 
router.put('/profile/personal', protect('client'), controllers.clientControllers.editPersonalInfoController)
router.put('/profile/medical', protect('client'), controllers.clientControllers.editMedicalInfoController)
router.put('/profile/changePassword', protect('client'), controllers.clientControllers.changePasswordController)

// add feedback
router.post('/feedback', protect('client'), controllers.clientControllers.addFeedbackController)




export default router;