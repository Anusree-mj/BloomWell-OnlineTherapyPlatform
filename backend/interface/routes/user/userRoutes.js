import express from 'express'
const router = express.Router();

import controllers from '../../../useCases/index.js';

//loginuser
router.post('/login', controllers.userControllers.authUser);

router.post('/getOtp', controllers.userControllers.getOtpController)

// forgot password
router.post('/forgotPassword/getOtp', controllers.userControllers.getForgotPasswordOTP)

router.post('/forgotPassword/verifyOtp', controllers.userControllers.verifyOTP)
// get notification
router.get('/notifications/:userId', controllers.userControllers.getNotificationController);
router.get('/notificationCount/:userId', controllers.userControllers.getNotificationCountController)
// read notification
router.put('/notifications/:notificationId', controllers.userControllers.readNotificationController);
// send chat message
router.post('/chat', controllers.userControllers.sendChatMessageController)
router.get('/chat/:senderId/:recieverId', controllers.userControllers.getChatController);


export default router;