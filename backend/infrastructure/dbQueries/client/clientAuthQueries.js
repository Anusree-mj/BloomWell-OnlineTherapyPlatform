import TempClient from "../../../entities/clients/tempClientModel.js";
import Client from "../../../entities/clients/clients.js";
import bcrypt from 'bcryptjs';
import User from "../../../entities/userModel.js";
import Therapists from "../../../entities/therapists/therapist.js";

const saveOtp = async (email, otp) => {
    try {
        const query = { email: email }
        const update = { otp: otp }
        const options = { upsert: true }
        const response = await TempClient.updateOne(query, update, options)
        if (response) return { status: 'ok' }
    }
    catch (err) {
        console.log(err)
    }
}

const verifyOTP = async (data, role) => {
    try {
        console.log(role, 'rolel')
        const verify = await TempClient.findOne({ email: data.email, otp: data.otp })
        if (verify) {
            console.log('otp match')
            if (role === 'client') {
                const { name, email, password } = data
                const hashedPassword = await bcrypt.hash(password, 10);
                await Client.insertMany({
                    name: name,
                    email: email,
                    password: hashedPassword,
                })
                await User.insertMany({
                    email: email,
                    password: hashedPassword,
                    role: role
                })
                const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
                return { status: 'ok', client }
            } else {
                const { name, email, password, phone, licenseNum, roleType } = data
                const hashedPassword = await bcrypt.hash(password, 10);
                await Therapists.insertMany({
                    name: name,
                    email: email,
                    phone: phone,
                    license: licenseNum,
                    role: roleType,
                    password: hashedPassword,
                })
                await User.insertMany({
                    email: email,
                    password: hashedPassword,
                    role: role
                })
                const therapist = await Therapists.findOne({ email: email }).select('-password -createdAt -updatedAt');
                return { status: 'ok', therapist }
            }
        } else {
            console.log('otp no match')
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
