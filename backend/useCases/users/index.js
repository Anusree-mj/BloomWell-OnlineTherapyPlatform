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



};

export default userControllers;
