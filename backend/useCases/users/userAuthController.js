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
        console.log('reached in controller with userId', userId)
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

const getNotificationCountController = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('reached in controller with userId', userId)
        const response = await userAuthQueries.getNotificationsCount(userId);
        if (response.status === 'ok') {
            const { status, count } = response
            res.status(200).json({ status: status, count });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message })
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const readNotificationController = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        console.log('reached in controller with notificatoinId', notificationId)
        const response = await userAuthQueries.readNotification(notificationId);
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message })
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const sendChatMessageController = async (req, res) => {
    try {
        const { messageData } = req.body;

        console.log('reached in controller with messageData', messageData)
        const response = await userAuthQueries.saveMessageData(messageData);
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            res.status(400).json({ status: 'nok', message: 'something went wrong' })
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const getChatController = async (req, res) => {
    try {
        const senderId = req.params.senderId;
        const recieverId = req.params.recieverId;

        console.log('reached in controller with ids', senderId, recieverId)
        const response = await userAuthQueries.getChats(senderId, recieverId);
        if (response.status === 'ok') {
            const { status, chats } = response
            res.status(200).json({ status, chats });
        } else {
            const { status, message } = response
            res.status(400).json({ status, message })
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
    getNotificationController,
    readNotificationController,
    sendChatMessageController,
    getChatController,
    getNotificationCountController,
}