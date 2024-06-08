import express from 'express'
const router = express.Router();
import { protect } from '../../middlewares/authMiddleware.js'

import controllers from '../../../useCases/index.js';

//loginuser
router.post('/login', controllers.userControllers.authUser);

router.post('/getOtp', controllers.userControllers.getOtpController)

// forgot password
router.post('/forgotPassword/getOtp', controllers.userControllers.getForgotPasswordOTP)

router.post('/forgotPassword/verifyOtp', controllers.userControllers.verifyOTP)
// get notification
router.get('/notifications/:userId', controllers.userControllers.getNotificationController);
// read notification
router.put('/notifications/:notificationId', controllers.userControllers.readNotificationController);


export default router;