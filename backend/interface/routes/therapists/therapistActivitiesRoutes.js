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
// therapist  quit
router.put('/quit', protect('therapist'), controllers.therapistControllers.doQuitController)
// get reviews and ratings
router.get('/reviews', protect('therapist'), controllers.therapistControllers.getReviewsController)
// therapist available slot management
router.post('/addAvailability', protect('therapist'), controllers.userControllers.addAvailabileSlotsController)
// schedulesss
router.get('/schedules', protect('therapist'), controllers.therapistControllers.getSchedulesController)
router.put('/schedules', protect('therapist'), controllers.therapistControllers.updateScheduleController)
// payments
router.get('/payments',protect('therapist'),controllers.therapistControllers.getPaymentsController)
// add description
router.post('/add/:keyId',protect('therapist'),controllers.therapistControllers.therapistsAddDataController)

export default router;

