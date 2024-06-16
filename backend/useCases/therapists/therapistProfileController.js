import therapistQuery from '../../infrastructure/dbQueries/therapist/therapistQuery.js';
import therapisttProfileQuery from '../../infrastructure/dbQueries/therapist/therapisttProfileQuery.js';

// get data 
const getTherapistData = async (req, res) => {
    try {
        const therapistId = req.params.therapistId
        console.log('therapist iddddd ', therapistId)
        const response = await therapistQuery.getTherapistDataWithReviews(therapistId);
        if (response.status === 'ok') {
            const { status, therapist, ratings, reviews } = response;
            res.status(200).json({ status: status, therapist, ratings, reviews });
        } else {
            res.status(400).json({ status: 'nok', message: 'Therapist not found' });
        }

    } catch (err) {
        console.log('Error found', err)

    }
}

// get profile data 
const getTherapistProfileDataController = async (req, res) => {
    try {
        const therapistId = req.user._id;
        console.log('therapist id founddddddddddddddddddd ', therapistId)
        const response = await therapistQuery.getTherapistData(therapistId);
        if (response.status === 'ok') {
            const { status, therapist } = response;
            res.status(200).json({ status: status, therapist: therapist });
        } else {
            res.status(400).json({ status: 'nok', message: 'Therapist not found' });
        }

    } catch (err) {
        console.log('Error found', err)

    }
}

// edit profile
const editTherapistPersonalInfoController = async (req, res) => {
    try {
        console.log('reached profile')
        const therapistId = req.user._id
        const personalInfo = req.body.personalInfo;

        const response = await therapisttProfileQuery.editTherapisttPersonalInfo(therapistId, personalInfo);
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

const editTherapistDescriptionController = async (req, res) => {
    try {
        console.log('reached description profile')
        const therapistId = req.user._id
        const aboutInfo = req.body.description;

        const response = await therapisttProfileQuery.editTherapistDescrptionInfo(therapistId, aboutInfo);
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
        console.log('reached change password controller therapist')
        const therapistId = req.user._id
        const { changPasswordInfo } = req.body;
        const response = await therapisttProfileQuery.changePassword(therapistId, changPasswordInfo);
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

const changeProfileImage = async (req, res) => {
    try {
        console.log('reached profile image controller')
        const therapistId = req.user._id;
        const { image } = req.body
        const response = await therapisttProfileQuery.changeImage(therapistId, image);
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            console.log('sending else status')
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        res.status(500).json({ err: 'Internal Server err', details: err.message });
        console.log('Error found', err)
    }
}

const editProffessionalInfoController = async (req, res) => {
    try {
        console.log('reached edit proffessional info')
        const therapistId = req.user._id
        const {proffessionalInfo} = req.body;

        const response = await therapisttProfileQuery.editProffessionalInfo(therapistId, proffessionalInfo);
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


export {
    getTherapistData,
    getTherapistProfileDataController,
    editTherapistPersonalInfoController,
    editTherapistDescriptionController,
    changePasswordController,
    changeProfileImage,
    editProffessionalInfoController,
}