import {
    therapistsSignUp,
    saveTherapistData,
    uploadImage

} from "./therapistAuth/therapistAuthController.js"

import {
    getTherapistData,
    getTherapistProfileDataController,
    editTherapistPersonalInfoController,
    editTherapistDescriptionController,
    changePasswordController,
    changeProfileImage,
    editProffessionalInfoController

} from "./profile/therapistProfileController.js"
import { doQuitController } from './therapistActivities/therapistQuitController.js'
import {
    getConnectionRequestController,
    manageConnectionRequestController,
    getRejectedConnectionsController,
    postConnectionRejectionReasonController,
    getActiveConnectionController,
    getInActiveConnectionController,
} from "./therapistActivities/therapistConnectionController.js"

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


    



}

export default therapistControllers
