import {
    therapistsSignUp,
    saveTherapistData,
    uploadImage
} from "./therapistAuth/therapistAuthController.js"

import {
    getTherapistData

} from "./profile/therapistProfileController.js"


const therapistControllers = {
    therapistsSignUp,
    saveTherapistData,
    getTherapistData,
    uploadImage,
}

export default therapistControllers
