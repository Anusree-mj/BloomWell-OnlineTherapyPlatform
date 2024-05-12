import TempClient from "../../../entities/clients/tempClientModel.js";
import Client from "../../../entities/clients/clients.js";
import bcrypt from 'bcryptjs';
import User from "../../../entities/userModel.js";

const saveOtp = async (email, otp) => {
    try {
        const query = { email: email }
        const update = { otp: otp }
        const options = { upsert: true }
        const response = await TempClient.updateOne(query, update, options)
        if (response) {
            return { status: 'ok' }
        }
    }
    catch (err) {
        console.log(err)
    }
}

const verifyOTP = async (data) => {
    try {
        const { type, otp, name, email, password, answers } = data
        const verify = TempClient.findOne({ email: email, otp: otp })
        if (verify) {
            console.log('otp matched')
            const userExists = await Client.findOne({ email: email });
            if (userExists) {
                console.log('userExists')
                return { status: 'nok', message: 'User already exists' }
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                await Client.insertMany({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    sessionType: type,
                    questionnaire: answers,
                })
                await User.insertMany({
                    email: email,
                    password: hashedPassword,
                    role: 'client'
                })
                const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
                return { status: 'ok', client }
            }

        } else {
            return { status: 'nok', message: 'Invalid OTP' }
        }
    } catch (err) {
        console.log(err)
    }
}

export default {
    saveOtp,
    verifyOTP,
}
