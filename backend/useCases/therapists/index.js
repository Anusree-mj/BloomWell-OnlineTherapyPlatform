import {
    therapistsSignUp,
    saveTherapistData,
    uploadImage

} from "./therapistAuthController.js"

import {
    getTherapistData,
    getTherapistProfileDataController,
    editTherapistPersonalInfoController,
    editTherapistDescriptionController,
    changePasswordController,
    changeProfileImage,
    editProffessionalInfoController

} from "./therapistProfileController.js"
import { doQuitController } from './therapistQuitController.js'
import {
    getConnectionRequestController,
    manageConnectionRequestController,
    getRejectedConnectionsController,
    postConnectionRejectionReasonController,
    getActiveConnectionController,
    getInActiveConnectionController,
    getReviewsController
} from "./therapistConnectionController.js"
import {
    getSchedulesController,
    updateScheduleController,

} from "./therapistActivitiesController.js"

const therapistControllers = {
    therapistsSignUp,
    saveTherapistData,
    getTherapistData,
    getTherapistProfileDataController,
    uploadImage,
    getConnectionRequestController,
    manageConnectionRequestController,
    editTherapistPersonalInfoController,
    editTherapistDescriptionController,
    changePasswordController,
    changeProfileImage,
    editProffessionalInfoController,
    getRejectedConnectionsController,
    postConnectionRejectionReasonController,
    getActiveConnectionController,
    getInActiveConnectionController,
    doQuitController,
    getReviewsController,
    getSchedulesController,
    updateScheduleController,


}

export default therapistControllers
