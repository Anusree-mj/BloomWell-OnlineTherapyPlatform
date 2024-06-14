import express from 'express'
const router = express.Router();
import controllers from '../../../useCases/index.js';
import { protect } from '../../middlewares/authMiddleware.js'

// get connection requests
router.get('/connections', protect('therapist'), controllers.therapistControllers.getConnectionRequestController)
// post connection request status
router.post('/connections', protect('therapist'), controllers.therapistControllers.manageConnectionRequestController)
// get rejected connections
router.get('/rejected/connections', protect('therapist'), controllers.therapistControllers.getRejectedConnectionsController)
router.post('/rejected/connections', protect('therapist'), controllers.therapistControllers.postConnectionRejectionReasonController)
// get active connections
router.get('/connections/active', protect('therapist'), controllers.therapistControllers.getActiveConnectionController)
// get inactive connections
router.get('/connections/inActive', protect('therapist'), controllers.therapistControllers.getInActiveConnectionController)
// quit
router.put('/quit', protect('therapist'), controllers.therapistControllers.doQuitController)









export default router;

