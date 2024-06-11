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

import {
    getConnectionRequestController,
    manageConnectionRequestController,
    getRejectedConnectionsController,
    postConnectionRejectionReasonController,

} from "./therapistConnections/therapistConnectionController.js"

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
}

export default therapistControllers
