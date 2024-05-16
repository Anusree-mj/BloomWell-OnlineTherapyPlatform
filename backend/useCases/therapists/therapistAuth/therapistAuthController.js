import { generateTherapistsToken } from '../../../utilitis/token.js';
import clientAuthQueries from '../../../infrastructure/dbQueries/client/clientAuthQueries.js';


// signup
const therapistsSignUp = async (data) => {
    try {
        console.log('entered in signup controller')
        const response = await clientAuthQueries.verifyOTP(data, 'therapists');
        if (response.status === 'ok') {
            const { therapist } = response;
            console.log(therapist, 'therapist received in controller')
            const token = generateTherapistsToken(therapist._id)
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


export {
    therapistsSignUp,
}