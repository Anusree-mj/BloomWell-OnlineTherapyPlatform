import {
    therapistsSignUp,
    saveTherapistData,
    uploadImage
} from "./therapistAuth/therapistAuthController.js"

import {
    getTherapistData

} from "./profile/therapistProfileController.js"

import {
    getConnectionRequestController,

} from "./therapistConnections/therapistConnectionController.js"

const therapistControllers = {
    therapistsSignUp,
    saveTherapistData,
    getTherapistData,
    uploadImage,
    getConnectionRequestController,
}

export default therapistControllers
