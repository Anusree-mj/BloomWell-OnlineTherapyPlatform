import therapistQuery from '../../../infrastructure/dbQueries/therapist/therapistQuery.js';


// get data 
const getTherapistData = async (req, res) => {
    try {
        const therapistId = req.params.therapistId
        console.log('therapist id ', therapistId)
        const response = await therapistQuery.getTherapistData(therapistId);
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



export {
    getTherapistData,
}