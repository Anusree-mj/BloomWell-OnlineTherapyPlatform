import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import { protect } from '../../../middlewares/authMiddleware.js'


// get therapist profile details
router.get('/profile', protect('therapist'), controllers.therapistControllers.getTherapistProfileDataController)

// edit profile
router.put('/profile/personal', protect('therapist'), controllers.therapistControllers.editTherapistPersonalInfoController)
router.put('/profile/description', protect('therapist'), controllers.therapistControllers.editTherapistDescriptionController)
router.put('/profile/changePassword', protect('therapist'), controllers.therapistControllers.changePasswordController)
export default router;