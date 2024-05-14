import { generateClientToken } from '../../../utilitis/token.js';
import clientAuthQueries from '../../../infrastructure/dbQueries/client/clientAuthQueries.js';
import { generateOTP, sendOtpByEmail } from '../../../utilitis/generateOTP.js';

// getOtp
const getOtp = async (email) => {
    try {
        const verifyUser = await clientAuthQueries.checkUser(email);
        if (verifyUser.status === 'ok') {
            const otp = generateOTP()
            const response = await clientAuthQueries.saveOtp(email, otp);
            if (response.status === 'ok') {
                await sendOtpByEmail(email, otp);
                return { status: 'ok' };
            }
        } else {
            return { status: 'nok', message: 'User already exists' }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}

// signup
const signUp = async (data) => {
    try {
        console.log('entered in signup controller')
        const response = await clientAuthQueries.verifyOTP(data);
        if (response.status === 'ok') {
            const { client } = response;
            const token = generateClientToken(client._id)
            console.log(token, 'token found in signup')
            return { status: 'ok', client, token };
        } else {
            const { message } = response
            return { status: 'nok', message }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}


export {
    getOtp,
    signUp,
}