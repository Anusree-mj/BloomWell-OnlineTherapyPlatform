import Therapists from "../../../entities/therapists/therapist.js";


const getTherapistsDetailsQuery = async () => {
    try {
        const therapists = await Therapists.find({}).select('-password');
        return { therapists }
    }
    catch (err) {
        console.log(err)
    }
}

const verifyTherapistQuery = async (therapistId, verifyStatus) => {
    try {
        const therapist = await Therapists.findByIdAndUpdate(therapistId, {
            verificationStatus: verifyStatus,
            isVerified: true
        });
        if (therapist) {
            return { status: 'ok' }
        } else {
            console.log('therapist not found')
        }
    } catch (err) {
        console.log(err.message)
    }
}


export default {
    getTherapistsDetailsQuery,
    verifyTherapistQuery,

}
