import TempUser from "../../../entities/users/tempUsersModel.js";
import Client from "../../../entities/clients/clients.js";
import bcrypt from 'bcryptjs';
import User from "../../../entities/users/userModel.js";
import Therapists from "../../../entities/therapists/therapist.js";



const connections = async (clientId) => {
    try {
        const client = await Client.findOne({ _id: clientId })
        console.log('client found', client)
return client

        // const { email, type, age, answers } = data
        // console.log(data, 'data in save details')
        // const query = { email: email }
        // const update = {
        //     sessionType: type,
        //     age: age,
        //     questionnaire: answers,
        // }
        // const options = { upsert: true }
        // const response = await Client.updateOne(query, update, options)
        // if (response) {
        //     const client = await Client.findOne({ email: email }).select('-password -createdAt -updatedAt');
        //     return { status: 'ok', client }
        // } else {
        //     return { status: 'nok', message: 'Client not found' }
        // }
    } catch (err) {
        console.log(err)
    }
}


export default {
    connections,
}
