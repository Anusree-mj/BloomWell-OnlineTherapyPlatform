import {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
    getNotificationController,
    readNotificationController,
    sendChatMessageController
} from './userAuthController.js';

const userControllers = {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
    getNotificationController,
    readNotificationController,
    sendChatMessageController,
    
};

export default userControllers;
