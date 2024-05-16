import Client from '../../../entities/clients/clients.js';
import User from '../../../entities/userModel.js';
import bcrypt from 'bcryptjs';
import TempClient from '../../../entities/clients/tempClientModel.js';
import Therapists from '../../../entities/therapists/therapist.js';

const userDoLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            const matchPassword = await bcrypt.compare(password, user.password);
            if (matchPassword) {
                if (user.role === 'client') {
                    const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
                    return { role: 'client', client }
                }
                // else {
                //     const therapist = await Therapist.findOne({ email: email }).select('-password -createdAt -updatedAt');
                //     return { role: 'therapist', therapist }
                // }
            }

        } else {
            console.log('no user')
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
        const verify = await TempClient.findOne({ email: email, otp: otp })
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
