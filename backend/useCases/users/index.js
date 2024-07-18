import {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
    getNotificationController,
    readNotificationController,
    sendChatMessageController,
    getChatController,
    getNotificationCountController,

} from './userAuthController.js';

import {
    addAvailabileSlotsController,
    getAvailableSlotsController,
    postBookedSlotController,
    getActiveSlotController,
    cancelSlotController,
    updateSessionController,
    updateStartSessionController,

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
    updateSessionController,
    updateStartSessionController,
    getNotificationCountController
};

export default userControllers;
