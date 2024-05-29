import express from 'express'
const router = express.Router();

import controllers from '../../../useCases/index.js';

//loginuser
router.post('/login', controllers.userAuthControllers.authUser);

router.post('/getOtp', controllers.userAuthControllers.getOtpController)

// forgot password
router.post('/forgotPassword/getOtp', controllers.userAuthControllers.getForgotPasswordOTP)

router.post('/forgotPassword/verifyOtp', controllers.userAuthControllers.verifyOTP)

export default router;