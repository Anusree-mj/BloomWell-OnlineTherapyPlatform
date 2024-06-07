import {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
    getNotificationController
} from './userAuthController.js';

const userControllers = {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
    getNotificationController
};

export default userControllers;
