import Client from '../../../entities/clients/clients.js';
import User from '../../../entities/users/userModel.js';
import bcrypt from 'bcryptjs';
import TempUser from '../../../entities/users/tempUsersModel.js';
import Therapists from '../../../entities/therapists/therapist.js';

const userDoLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            console.log('user found')
            const matchPassword = await bcrypt.compare(password, user.password);
            if (matchPassword) {
                console.log('password matched')
                if (user.role === 'client') {
                    console.log('client found')
                    const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
                    return { status: 'ok', role: 'client', client }
                }
                else {
                    console.log('therapist found')
                    const therapist = await Therapists.findOne({ email: email }).select('-password -createdAt -updatedAt');
                    return { status: 'ok', role: 'therapist', therapist }
                }
            } else {
                return { status: 'nok', message: 'Invalid password' }
            }

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

export default {
    userDoLogin,
    checkUser,
    verifyEmail,
    verifyOTPQuery
}
