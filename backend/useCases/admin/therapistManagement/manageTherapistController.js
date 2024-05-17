import manageTherapistQueries from "../../../infrastructure/dbQueries/admin/manageTherapistQueries.js";

// get therapists
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

// delet therapist
const deleteTherapistController = async (therapistId) => {
    try {
        const { status } = await manageTherapistQueries.deleteTherapistsQuery(therapistId);
        if (status === 'ok') {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// edit therapist
const editTherapistController = async (therapistId) => {
    try {
        const { status } = await manageTherapistQueries.editTherapistsQuery(therapistId);
        if (status === 'ok') {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}

export {
    getTherapistsDetailsController,
    verifyTherapistController,
    deleteTherapistController,
    editTherapistController
}