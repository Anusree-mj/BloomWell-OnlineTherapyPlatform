import Client from "../../../entities/clients/clients.js"
import bcrypt from 'bcryptjs';

const editClientPersonalInfo = async (clientId, personalInfo) => {
    try {
        const { name, email, age, sessionPreferred } = personalInfo
        const query = { _id: clientId }
        const update = {
            name: name,
            email: email,
            age: age,
            sessionType: sessionPreferred
        }
        const options = { upsert: false }
        const response = await Client.updateOne(query, update, options)
        if (response.modifiedCount > 0) return { status: 'ok' }
    }
    catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Invalid entry' }
    }
}

const editClientMedicalInfo = async (clientId, medicalInfo) => {
    try {
        const { questionnaire } = medicalInfo
        const query = { _id: clientId }
        const update = {
            questionnaire: questionnaire
        }
        const options = { upsert: false }
        const response = await Client.updateOne(query, update, options)
        if (response.modifiedCount > 0) return { status: 'ok' }
    }
    catch (err) {
        console.log(err)
        return { status: 'nok', message: 'Invalid entry' }
    }
}

const changePassword = async (clientId, changPasswordInfo) => {
    try {
        const { currentPassword, newPassword } = changPasswordInfo;
        console.log('reached change pasword query with:', currentPassword, newPassword)
        
        const client = await Client.findOne({ _id: clientId });
        const matchPassword = await bcrypt.compare(currentPassword, client.password);
       
        if (matchPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const query = { _id: clientId }
            const update = { password: hashedPassword };
            const options = { upsert: false }
            const check = await Client.updateOne(query, update, options);
            console.log('checkkkkkkkkkk', check)
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

export default {
    editClientPersonalInfo,
    editClientMedicalInfo,
    changePassword,
}