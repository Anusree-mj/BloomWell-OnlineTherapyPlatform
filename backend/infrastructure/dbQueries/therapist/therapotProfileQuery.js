import Therapists from "../../../entities/therapists/therapist.js"

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


export default {
    editTherapisttPersonalInfo,
    editTherapistDescrptionInfo,
}