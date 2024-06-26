import manageTherapistQueries from "../../../infrastructure/dbQueries/admin/manageTherapistQueries.js";

// get therapists
const getTherapistsDetailsController = async (req, res) => {
    try {
        const { therapists } = await manageTherapistQueries.getTherapistsDetailsQuery()
        if (therapists) {
            res.status(200).json({
                status: 'ok',
                therapists: therapists
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)

    }
}

// verify therapists
const verifyTherapistController = async (req, res) => {
    try {
        const therapistId = req.params.therapistId
        const { verifyStatus } = req.body;
        const { status } = await manageTherapistQueries.verifyTherapistQuery(therapistId, verifyStatus)
        if (status === 'ok') {
            res.status(200).json({
                status: 'ok',
                message: 'Therapist verified succesfully'
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: 'Invalid entry' })
        console.log('Error found', err)
    }
}

// delet therapist
const deleteTherapistController = async (req, res) => {
    try {
        const therapistId = req.params.therapistId
        const { status } = await manageTherapistQueries.deleteTherapistsQuery(therapistId);
        if (status === 'ok') {
            res.status(200).json({
                status: 'ok',
                message: 'User blocked succesfully'
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: 'Invalid entry' })
        console.log('Error found', err)
    }
}

// edit therapist
const editTherapistController = async (req, res) => {
    try {
        const therapistId = req.params.therapistId
        const { status } = await manageTherapistQueries.editTherapistsQuery(therapistId);
        if (status === 'ok') {
            res.status(200).json({
                status: 'ok',
                message: 'User unblocked succesfully'
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: 'Invalid entry' })
        console.log('Error found', err)

    }
}

// get rejected therapists
const getRejectedTherapistController = async (req, res) => {
    try {
        const { therapists } = await manageTherapistQueries.getRejectedTherapistQuery()
        if (therapists) {
            res.status(200).json({
                status: 'ok',
                therapists: therapists
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)
    }
}
// post rejected reason
const postRejectedReasonController = async (req, res) => {
    try {
        const { reason, reasonId } = req.body
        const response = await manageTherapistQueries.postRejectedReasonQuery(reasonId, reason);
        if (response.status === 'ok') {
            res.status(200).json({ status: response.status });
        } else {
            const { status, message } = response
            res.status(200).json({ status: status, message: message });
        }
    }
    catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)
    }
}

// get therapist who quit
const getTherapistsWhoQuitController = async (req, res) => {
    try {
        const { therapists } = await manageTherapistQueries.getTherapistWhoQuitQuery()
        console.log('readched therapist who controller')
        if (therapists) {
            console.log('theapists found ', therapists)
            res.status(200).json({
                status: 'ok',
                therapists: therapists
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)
    }
}
export {
    getTherapistsDetailsController,
    verifyTherapistController,
    deleteTherapistController,
    editTherapistController,
    getRejectedTherapistController,
    postRejectedReasonController,
    getTherapistsWhoQuitController,


}