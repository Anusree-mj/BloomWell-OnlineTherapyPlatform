import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import { protect } from '../../../middlewares/authMiddleware.js'


router.get('/profile', protect('therapist'), controllers.therapistControllers.getTherapistProfileDataController)
// get therapist details for admin view and client view
router.get('/:therapistId', controllers.therapistControllers.getTherapistData)
// get therapist profile details



export default router;