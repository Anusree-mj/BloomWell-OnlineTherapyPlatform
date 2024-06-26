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
    getActiveSlotController,
    cancelSlotController,

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
    getActiveSlotController,
    cancelSlotController,


};

export default userControllers;
