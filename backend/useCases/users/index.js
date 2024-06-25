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

import {
    addAvailabileSlotsController,
    getAvailableSlotsController,
    postBookedSlotController,

} from './slotManaginController.js';

const userControllers = {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
    getNotificationController,
    readNotificationController,
    sendChatMessageController,
    getChatController,
    addAvailabileSlotsController,
    getAvailableSlotsController,
    postBookedSlotController,



    
};

export default userControllers;
