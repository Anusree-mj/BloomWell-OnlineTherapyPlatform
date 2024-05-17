
import Therapists from "../../../entities/therapists/therapist.js";



const saveTherapistData = async (data) => {
    try {
        const { email, licenseNo, expertise, country, expiryDate, experience, description, image } = data
        const query = { email: email }
        const update = {
            license: {
                licenseNo: licenseNo,
                country: country,
                expirationDate: expiryDate
            },
            expertise: expertise,
            experience: experience,
            description: description,
            image: image
        }
        const options = { upsert: true }
        const response = await Therapists.updateOne(query, update, options)
        if (response) {
            const therapist = await Therapists.findOne({ email: email }).select('-password -createdAt -updatedAt');
            return { status: 'ok', therapist }
        } else {
            return { status: 'nok', message: 'Therapist not found' }
        }
    } catch (err) {
        console.log(err)
    }
}



const getTherapistData = async (therapistId) => {
    try {
        const therapist = await Therapists.findOne({ _id: therapistId }).select('-password-createdAt -updatedAt')
        if (therapist) {
            return { status: 'ok', therapist }
        } else {
            console.log('no therapist found')
        }
    }
    catch (err) {
        console.log(err)
    }
}
export default {
    saveTherapistData,
    getTherapistData,
}
