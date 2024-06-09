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

} from "./profile/therapistProfileController.js"

import {
    getConnectionRequestController,
    manageConnectionRequestController,

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
    
}

export default therapistControllers
