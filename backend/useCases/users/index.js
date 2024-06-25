import {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
    getNotificationController,
    readNotificationController,
    sendChatMessageController,
    getChatController,

} from './userAuthController.js';

const userControllers = {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
    getNotificationController,
    readNotificationController,
    sendChatMessageController,
    getChatController
};

export default userControllers;
