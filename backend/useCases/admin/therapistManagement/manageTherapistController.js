import manageTherapistQueries from "../../../infrastructure/dbQueries/admin/manageTherapistQueries.js";

// get clients
const getTherapistsDetailsController = async () => {
    try {
        const { therapists } = await manageTherapistQueries.getTherapistsDetailsQuery()
        return { therapists }
    } catch (err) {
        console.log('Error found', err)

    }
}

// verify therapists
const verifyTherapistController = async (therapistId, verifyStatus) => {
    try {
        const { status } = await manageTherapistQueries.verifyTherapistQuery(therapistId, verifyStatus)
        if (status === 'ok') {
            return { status }
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    getTherapistsDetailsController,
    verifyTherapistController
}