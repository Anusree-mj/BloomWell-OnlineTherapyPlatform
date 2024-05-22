import { generateToken } from '../../../utilitis/token.js';
import clientAuthQueries from '../../../infrastructure/dbQueries/client/clientAuthQueries.js';
import therapistQuery from '../../../infrastructure/dbQueries/therapist/therapistQuery.js';


// signup
const therapistsSignUp = async (data) => {
    try {
        console.log('entered in signup controller')
        const response = await clientAuthQueries.verifyOTP(data, 'therapists');
        if (response.status === 'ok') {
            const { therapist } = response;
            console.log(therapist, 'therapist received in controller')
            const token = generateToken(therapist._id)
            console.log(token, 'token found in signup')
            return { status: 'ok', therapist, token };
        } else {
            const { message } = response
            return { status: 'nok', message }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}

// save data 
const saveTherapistData = async (data) => {
    try {
        console.log('entered in signup controller')
        const response = await therapistQuery.saveTherapistData(data);
        if (response.status === 'ok') {
            const { status, therapist } = response
            console.log(status, therapist, 'details got back in controller');
            return { status, therapist }
        } else {
            const { status, message } = response
            return { status, message }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}

export {
    therapistsSignUp,
    saveTherapistData,
}