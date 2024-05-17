import {
    therapistsSignUp,
    saveTherapistData
} from "./therapistAuth/therapistAuthController.js"

import {
    getTherapistData

} from "./profile/therapistProfileController.js"


const therapistControllers = {
    therapistsSignUp,
    saveTherapistData,
    getTherapistData
}

export default therapistControllers
