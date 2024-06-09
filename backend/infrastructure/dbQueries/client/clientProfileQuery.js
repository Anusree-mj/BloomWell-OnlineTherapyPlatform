import Client from "../../../entities/clients/clients.js"

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
        return{status:'nok',message:'Invalid entry'}
    }
}

export default {
    editClientPersonalInfo
}