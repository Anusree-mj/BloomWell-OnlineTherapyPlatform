import therapistQuery from '../../../infrastructure/dbQueries/therapist/therapistQuery.js';


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



export {
    getTherapistData,
    getTherapistProfileDataController
}