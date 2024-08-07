import Client from '../../../entities/clients/clients.js';
import User from '../../../entities/users/userModel.js';
import bcrypt from 'bcryptjs';
import TempUser from '../../../entities/users/tempUsersModel.js';
import Therapists from '../../../entities/therapists/therapist.js';
import Notifications from '../../../entities/users/notificationModel.js'
import Chats from '../../../entities/users/chat.js';

const userDoLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            console.log('user found')
            // const matchPassword = await bcrypt.compare(password, user.password);
            // if (matchPassword) {
            console.log('password matched')
            if (user.role === 'client') {
                console.log('client found')
                const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
                if (client.isBlocked) {
                    return { status: 'nok', message: 'User is blocked' }
                } else {
                    return { status: 'ok', role: 'client', client }
                }
            }
            else {
                console.log('therapist found')
                const therapist = await Therapists.findOne({ email: email }).select('-password -createdAt -updatedAt');
                if (therapist.isBlocked) {
                    return { status: 'nok', message: 'User is blocked' }
                }
                return { status: 'ok', role: 'therapist', therapist }
            }
            // } else {
            //     return { status: 'nok', message: 'Invalid password' }
            // }

        } else {
            return { status: 'nok', message: 'Invalid email' }
        }
    }
    catch (err) {
        console.log(err)
    }
}

const checkUser = async (email) => {
    try {
        const client = await Client.findOne({ email: email });
        const therapist = await Therapists.findOne({ email: email })
        if (client || therapist) {  //&&therapist
            return { status: 'nok' }
        } else {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log(err)
    }
}

const verifyEmail = async (email) => {
    try {
        const client = await Client.findOne({ email: email });
        const therapist = await Therapists.findOne({ email: email })
        if (client || therapist) {
            return { status: 'ok' }
        } else {
            return { status: 'nok' }
        }
    } catch (err) {
        console.log(err)
    }
}

const verifyOTPQuery = async (email, otp) => {
    try {
        console.log('entered in verify otp query')
        const verify = await TempUser.findOne({ email: email, otp: otp })
        if (verify) {
            console.log('verified')
            return { status: 'ok' }
        } else {
            return { status: 'nok' }
        }
    }
    catch (err) {

    }
}

const getNotifications = async (userId) => {
    try {
        const notifications = await Notifications.find({ userId: userId }).sort({ createdAt: -1 });
        if (notifications) {
            return { status: 'ok', notifications }
        } else {
            return { status: 'nok', message: 'Invalid request' }
        }

    } catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Invalid request' }
    }
}

const getNotificationsCount = async (userId) => {
    try {
        const count = await Notifications.countDocuments({ userId: userId, isRead: false });
        return { status: 'ok', count: count ?? 0 };
    } catch (err) {
        console.log(err);
        return { status: 'nok', message: 'Invalid request' };
    }
}

const readNotification = async (notificationId) => {
    try {
        const query = { _id: notificationId }
        const update = { isRead: true }
        const options = { upsert: false }
        const response = await Notifications.updateOne(query, update, options)

        if (response.modifiedCount <= 1) {
            console.log('response', response)
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Invalid request' }
        }

    } catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Invalid request' }
    }
}

const saveMessageData = async (messageData) => {
    try {
        const { reciever:
            { recieverId, role: recieverRole },
            sender: { senderId, role: senderRole }, message } = messageData;

        const save = await Chats.insertMany({
            senderId: senderId,
            senderType: senderRole,
            recieverId: recieverId,
            recieverType: recieverRole,
            message: message,
        })
        if (save) {
            console.log(save, 'data saved')
            return { status: 'ok' }
        }
    } catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Invalid request' }
    }
}

const getChats = async (senderId, recieverId) => {
    try {
        const chats = await Chats.find({
            $or: [
                { senderId: senderId, recieverId: recieverId },
                { senderId: recieverId, recieverId: senderId }
            ]
        })
            .populate('senderId', '_id')
            .populate('recieverId', '_id')
        if (chats) {
            console.log('chats found ', chats)
            return { status: 'ok', chats }
        } else {
            return { status: 'nok', message: 'Invalid request' }
        }
    } catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Invalid request' }
    }
}

export default {
    userDoLogin,
    checkUser,
    verifyEmail,
    verifyOTPQuery,
    getNotifications,
    readNotification,
    saveMessageData,
    getChats,
    getNotificationsCount,
}
