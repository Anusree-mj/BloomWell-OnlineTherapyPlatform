import TempUser from "../../../entities/users/tempUsersModel.js";
import Client from "../../../entities/clients/clients.js";
import bcrypt from 'bcryptjs';
import User from "../../../entities/users/userModel.js";
import Therapists from "../../../entities/therapists/therapist.js";


const saveOtp = async (email, otp) => {
    try {
        const query = { email: email }
        const update = { otp: otp }
        const options = { upsert: true }
        const response = await TempUser.updateOne(query, update, options)
        if (response) return { status: 'ok' }
    }
    catch (err) {
        console.log(err)
    }
}

const verifyOTP = async (data, role) => {
    try {
        const verify = await TempUser.findOne({ email: data.email, otp: data.otp });
        if (verify) {
            console.log('OTP matched');
            let user, newUser;
            if (role === 'client') {
                const { name, email, password } = data;
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.insertMany({ email: data.email, password: hashedPassword, role: role })
                newUser = {
                    name: name,
                    email: email,
                    password: hashedPassword,
                };
                user = await Client.create(newUser);
            } else {
                const { name, email, password, phone, licenseNum, roleType, image } = data;
                console.log('password:', password);
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.insertMany({ email: data.email, password: hashedPassword, role: role })
                newUser = {
                    name: name,
                    email: email,
                    phone: phone,
                    license: {
                        licenseNo: licenseNum,
                        licenseProof: image
                    },
                    role: roleType,
                    password: hashedPassword,
                };
                user = await Therapists.create(newUser);
            }
            return { status: 'ok', user };
        } else {
            console.log('OTP does not match');
            return { status: 'nok', message: 'Invalid OTP' };
        }
    } catch (err) {
        console.error('Error in verifyOTP:', err);
        return { status: 'error', message: err.message };
    }
}

const saveAuthData = async (profile) => {
    try {
        const { name, email, id } = profile
        const checkClient = await Client.findOne({ email: email });
        if (checkClient) {
            console.log('data already found', checkClient)
            return { status: 'ok', user: checkClient }
        } else {
            const hashedPassword = await bcrypt.hash(id, 10);

            const user = await Client.insertMany({ name: name, email: email, password: hashedPassword });

            return { status: 'ok', user }
        }
    } catch (err) {
        console.error('Error in verifyOTP:', err);
        return { status: 'error', message: err.message };
    }
}

const saveClientData = async (data) => {
    try {
        const { email, type, age, answers } = data
        const query = { email: email }
        const update = {
            sessionType: type,
            age: age,
            questionnaire: answers,
        }
        const options = { upsert: true }
        const response = await Client.updateOne(query, update, options)
        if (response) {
            const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
            return { status: 'ok', client }
        } else {
            return { status: 'nok', message: 'Client not found' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getClientDataQuery = async (clientId) => {
    try {
        let client = await Client.findOne({ _id: clientId }, { password: 0 });
        if (client.isAnUser) {
            console.log('entered in iffffff query')
            client = await Client.aggregate([
                {
                    $match: { _id: clientId }
                },
                {
                    $lookup: {
                        from: 'connections',
                        localField: 'connectionId',
                        foreignField: '_id',
                        as: 'connectionDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$connectionDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'therapists',
                        localField: 'connectionDetails.therapistId',
                        foreignField: '_id',
                        as: 'therapistDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$therapistDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        name: 1,
                        email: 1,
                        age: 1,
                        sessionType: 1,
                        questionnaire: 1,
                        subscription: 1,
                        isConnected: 1,
                        isAnUser: 1,
                        isSubscribed: 1,
                        isBlocked: 1,
                        isActiveSlots: 1,
                        activeSlotId: 1,
                        description: 1,
                        remarks: 1,
                        connectionDetails: {
                            _id: 1,
                            isActive: 1,
                            createdAt: 1,
                        },
                        therapistDetails: {
                            _id: 1,
                            name: 1,
                        },
                    }
                }
            ]);
            console.log('clietneeedetailsssssssssssssss:::::::::::::', client[0])
            return { status: 'ok', client: client[0] }
        } else {
            console.log('passing else')
            return { status: 'ok', client }

        }
    } catch (err) {
        console.log('Error found', err.message)
    }
}

export default {
    saveOtp,
    verifyOTP,
    saveClientData,
    getClientDataQuery,
    saveAuthData,
}
