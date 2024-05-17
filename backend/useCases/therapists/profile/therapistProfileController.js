import therapistQuery from '../../../infrastructure/dbQueries/therapist/therapistQuery.js';


// get data 
const getTherapistData = async (therapistId) => {
    try {
        console.log('entered in therpist profile controller')
        const response = await therapistQuery.getTherapistData(therapistId);
        if (response.status === 'ok') {
            const { status, therapist } = response;
            return { status, therapist };
        } else {
            return { status: 'nok', message: 'Invalid therapistid' }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}



export {
    getTherapistData,
}