import express from 'express'
const router = express.Router();
import { protectAdmin } from '../../middlewares/adminAuthMiddleware.js';
import controllers from '../../../useCases/index.js'

// get therapists details
router.get('/view', protectAdmin, controllers.adminControllers.getTherapistsDetailsController)
// get therapist details for admin view and client view
router.get('/view/:therapistId', controllers.therapistControllers.getTherapistData)
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
// get rejected therapists
router.get('/rejected', protectAdmin, controllers.adminControllers.getRejectedTherapistController)
router.post('/rejected', protectAdmin, controllers.adminControllers.postRejectedReasonController)
// get therapist who quit
router.get('/quit', protectAdmin, controllers.adminControllers.getTherapistsWhoQuitController)




export default router;