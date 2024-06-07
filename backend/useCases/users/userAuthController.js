import { generateToken } from '../../utilitis/token.js';
import userAuthQueries from '../../infrastructure/dbQueries/user/userAuthQueries.js';
import clientAuthQueries from '../../infrastructure/dbQueries/client/clientAuthQueries.js';
import { generateOTP, sendOtpByEmail } from '../../utilitis/generateOTP.js';

// auth user
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userAuthQueries.userDoLogin(email, password);
        if (response.status === 'ok') {
            console.log('response got from query')
            if (response.role === 'client') {
                const { status, client } = response;
                const token = generateToken(client._id);
                res.cookie('jwtClient', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
                res.status(200).json({ status: status, role: 'client', client: client });
            }
            else {
                const { status, therapist } = response;
                const token = generateToken(therapist._id);
                res.cookie('jwtTherapist', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true });
                res.status(200).json({ status: status, role: 'therapist', therapist: therapist });
            }
        } else {
            console.log('response nok invalid ')
            const { status, message } = response
            res.status(401).json({ status: status, message: message });
        }
    } catch (error) {
        console.log('Error found', error)
    }
}

// getOtp controller
const getOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        const verifyUser = await userAuthQueries.checkUser(email);
        if (verifyUser.status === 'ok') {
            const otp = generateOTP()
            console.log(otp, 'otp')
            const response = await clientAuthQueries.saveOtp(email, otp);
            if (response.status === 'ok') {
                await sendOtpByEmail(email, otp);
                res.status(200).json({ status: 'ok' });
            } else {
                res.status(400).json({ status: 'nok', message: 'User already exists' })
            }
        }
    } catch (err) {
        console.log('Error found', err)

    }
}


// forgot password get otp
const getForgotPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const verifyUser = await userAuthQueries.verifyEmail(email);
        if (verifyUser.status === 'ok') {
            const otp = generateOTP()
            console.log(otp, 'otp')
            const response = await clientAuthQueries.saveOtp(email, otp);
            if (response.status === 'ok') {
                await sendOtpByEmail(email, otp);
                res.status(200).json({ status: 'ok' });
            } else {
                res.status(400).json({ status: 'nok', message: 'Invalid email' })
            }
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const { status } = await userAuthQueries.verifyOTPQuery(email, otp);
        if (status === 'ok') {
            res.status(200).json({ status: 'ok' });
        } else {
            res.status(400).json({ status: 'nok', message: 'Invalid OTP' })
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const getNotificationController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await userAuthQueries.getNotifications(userId);
        if (response.status === 'ok') {
            const { status, notifications } = response
            res.status(200).json({ status: status, notifications: notifications });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message })
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
    getNotificationController
}