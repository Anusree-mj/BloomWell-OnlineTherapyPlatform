import { generateClientToken, generateTherapistsToken } from '../../utilitis/token.js';
import userAuthQueries from '../../infrastructure/dbQueries/user/userAuthQueries.js';
import clientAuthQueries from '../../infrastructure/dbQueries/client/clientAuthQueries.js';
import { generateOTP, sendOtpByEmail } from '../../utilitis/generateOTP.js';

// auth user
const authUser = async (email, password) => {
    try {
        console.log('entereed in user controllerrrrrrrrr');
        const response = await userAuthQueries.userDoLogin(email, password);
        if (response.status === 'ok') {
            console.log('response got from query')
            if (response.role === 'client') {
                const { status, client } = response;
                const token = generateClientToken(client._id);
                return { status, client, token, role: 'client' }
            }
            else {
                const { status, therapist } = response;
                const token = generateTherapistsToken(therapist._id);
                return { status, therapist, token, role: 'therapist' }
            }
        } else {
            console.log('response nok invalid ')
            const { status, message } = response
            return { status, message }
        }
    } catch (error) {
        console.log('Error found', error)
    }
}

// getOtp controller
const getOtpController = async (email) => {
    try {
        const verifyUser = await userAuthQueries.checkUser(email);
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


// forgot password get otp
const getForgotPasswordOTP = async (email) => {
    try {
        const verifyUser = await userAuthQueries.verifyEmail(email);
        if (verifyUser.status === 'ok') {
            const otp = generateOTP()
            const response = await clientAuthQueries.saveOtp(email, otp);
            if (response.status === 'ok') {
                await sendOtpByEmail(email, otp);
                return { status: 'ok' };
            }
        } else {
            return { status: 'nok', message: 'Email not found' }
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const verifyOTP = async (email, otp) => {
    try {
        console.log('entered in verify otp controller')
        const { status } = await userAuthQueries.verifyOTPQuery(email, otp);
        if (status === 'ok') {
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Invalid OTP' }
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    authUser,
    getOtpController,
    getForgotPasswordOTP,
    verifyOTP,
}