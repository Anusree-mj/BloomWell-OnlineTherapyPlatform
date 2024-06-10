import express from 'express'
const router = express.Router();
import controllers from '../../../../useCases/index.js';
import { protect } from '../../../middlewares/authMiddleware.js'
import { upload } from '../../../../utilitis/multer.js';


// get therapist profile details
router.get('/profile', protect('therapist'), controllers.therapistControllers.getTherapistProfileDataController)

// edit profile
router.put('/profile/personal', protect('therapist'), controllers.therapistControllers.editTherapistPersonalInfoController)
router.put('/profile/description', protect('therapist'), controllers.therapistControllers.editTherapistDescriptionController)
router.put('/profile/changePassword', protect('therapist'), controllers.therapistControllers.changePasswordController)
router.put('/profile/image', protect('therapist'),controllers.therapistControllers.changeProfileImage)
router.put('/profile/proffessional',protect('therapist'),controllers.therapistControllers.editProffessionalInfoController)
export default router;