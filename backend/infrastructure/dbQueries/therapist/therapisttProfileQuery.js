import Therapists from "../../../entities/therapists/therapist.js"
import bcrypt from 'bcryptjs';
const editTherapisttPersonalInfo = async (therapistId, personalInfo) => {
    try {
        const { name, email, phone, role, gender } = personalInfo
        const query = { _id: therapistId }
        const update = {
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            role: role
        }
        const options = { upsert: false }
        const response = await Therapists.updateOne(query, update, options)
        if (response.modifiedCount > 0) return { status: 'ok' }
        return { status: 'nok' }
    }
    catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Invalid entry' }
    }
}

const editTherapistDescrptionInfo = async (therapistId, aboutInfo) => {
    try {
        const query = { _id: therapistId }
        const update = {
            description: aboutInfo
        }
        const options = { upsert: false }
        const response = await Therapists.updateOne(query, update, options)
        if (response.modifiedCount > 0) return { status: 'ok' }
        return { status: 'nok' }
    }
    catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Invalid entry' }
    }
}

const changePassword = async (therapistId, changPasswordInfo) => {
    try {
        const { currentPassword, newPassword } = changPasswordInfo;
        console.log('reached change pasword query with:', currentPassword, newPassword)

        const therapist = await Therapists.findOne({ _id: therapistId });
        const matchPassword = await bcrypt.compare(currentPassword, therapist.password);

        if (matchPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const query = { _id: therapistId }
            const update = { password: hashedPassword };
            const options = { upsert: false }
            await Therapists.updateOne(query, update, options);
            return { status: 'ok' }
        } else {
            console.log('password doesnt match')
            return { status: 'nok', message: 'Invalid password' }
        }
    }
    catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Something went wrong' }
    }
}

const changeImage = async (therapistId, image) => {
    try {
        const query = { _id: therapistId };
        const update = { image: image };
        const options = { upsert: false };
        const updateImage = await Therapists.updateOne(query, update, options);
        if (updateImage.modifiedCount > 0) {
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'something went wrong' }
        }
    } catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Something went wrong' }
    }
}

export default {
    editTherapisttPersonalInfo,
    editTherapistDescrptionInfo,
    changePassword,
    changeImage,
}