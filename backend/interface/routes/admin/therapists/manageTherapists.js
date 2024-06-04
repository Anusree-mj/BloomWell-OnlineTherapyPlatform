import express from 'express'
const router = express.Router();
import { protectAdmin } from '../../../middlewares/adminAuthMiddleware.js';
import controllers from '../../../../useCases/index.js'

// get therapists details
router.get('/view', protectAdmin, controllers.adminControllers.getTherapistsDetailsController)

// verify therapist
router.post('/:therapistId/verify', protectAdmin, controllers.adminControllers.verifyTherapistController)

// delete therapist
router.delete('/:therapistId', protectAdmin, controllers.adminControllers.deleteTherapistController)

// edit therapsit
router.put('/:therapistId', protectAdmin, controllers.adminControllers.editTherapistController)
// get connection requests
router.get('/connections', protectAdmin, controllers.adminControllers.getAllConnectionRequestController)
// post connection status
router.post('/connections', protectAdmin, controllers.adminControllers.manageConnectionRequestController)

export default router;