import clientProfileQuery from "../../../infrastructure/dbQueries/client/clientProfileQuery.js";

// edit profile 
const editPersonalInfoController = async (req, res) => {
    try {
        console.log('reached profile')
        const clientId = req.user._id
        const personalInfo = req.body.personalInfo;

        const response = await clientProfileQuery.editClientPersonalInfo(clientId, personalInfo);
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            res.status(400).json({ status: 'nok', message: 'Something went wrong' });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const editMedicalInfoController = async (req, res) => {
    try {
        console.log('reached profile')
        const clientId = req.user._id
        const medicalInfo = req.body.medicalInfo;

        const response = await clientProfileQuery.editClientMedicalInfo(clientId, medicalInfo);
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            res.status(400).json({ status: 'nok', message: 'Something went wrong' });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const changePasswordController = async (req, res) => {
    try {
        console.log('reached change password controller client')
        const clientId = req.user._id
        const { changPasswordInfo } = req.body;

        const response = await clientProfileQuery.changePassword(clientId, changPasswordInfo);
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            console.log('sending else status')
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    editPersonalInfoController,
    editMedicalInfoController,
    changePasswordController,
}