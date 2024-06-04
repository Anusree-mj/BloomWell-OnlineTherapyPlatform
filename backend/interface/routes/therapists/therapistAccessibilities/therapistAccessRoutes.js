import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import { protect } from '../../../middlewares/authMiddleware.js'

// get connection requests
router.get('/connections', protect('therapist'), controllers.therapistControllers.getConnectionRequestController)
// post connection request status
router.post('/connections', protect('therapist'), controllers.therapistControllers.manageConnectionRequestController)

export default router;