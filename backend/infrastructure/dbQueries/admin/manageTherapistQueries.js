import Therapists from "../../../entities/therapists/therapist.js";
import Notifications from "../../../entities/users/notificationModel.js";

const getTherapistsDetailsQuery = async () => {
    try {
        const therapists = await Therapists.find({}).select('-password').sort({ createdAt: -1 });
        return { therapists }
    }
    catch (err) {
        console.log(err)
    }
}

const verifyTherapistQuery = async (therapistId, verifyStatus) => {
    try {
        if (verifyStatus === 'Granted') {
            const message = `Congratulations! Your profile has been successfully verified. Welcome to our platform! We are excited to have you on board.`;
            await Notifications.insertMany({
                userId: therapistId,
                userType: 'Therapists',
                head: 'Profile Verification',
                message: message,
            })
            await Therapists.findByIdAndUpdate(therapistId, {
                isActive: true
            });
        }
        console.log('reached out')
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

const deleteTherapistsQuery = async (therapistsId) => {
    try {
        const therapists = await Therapists.findByIdAndUpdate(therapistsId, { isBlocked: true });
        if (therapists) {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log(err.message)
    }
}

const editTherapistsQuery = async (therapistsId) => {
    try {
        const therapists = await Therapists.findByIdAndUpdate(therapistsId, { isBlocked: false });
        if (therapists) {
            return { status: 'ok' }
        }
    } catch (err) {
        console.log(err.message)
    }
}

const getRejectedTherapistQuery = async () => {
    try {
        const therapists = await Therapists.find({ verificationStatus: 'Denied' }).select('-password').sort({ createdAt: -1 });
        return { therapists }
    }
    catch (err) {
        console.log(err)
    }
}

const postRejectedReasonQuery = async (therapistId, reason) => {
    try {
        const message = `Your profile has been reviewed, and we regret to inform you that it has been rejected due to the following reason: "${reason}". Please feel free to update your information and reapply. If you have any questions or need further assistance, do not hesitate to contact our support team.`;

        await Notifications.insertMany({
            userId: therapistId,
            userType: 'Therapists',
            head: 'Profile Verification',
            message: message,
        })
        const query = { _id: therapistId };
        const update = { reasonForRejection: reason };
        const options = { upsert: true };
        const updatedTherapist = await Therapists.updateOne(query, update, options);
        console.log(updatedTherapist, 'updsfasdfdsfsdf')
        if (updatedTherapist.modifiedCount > 0) {
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Something went wrong' }
        }

    }
    catch (err) {
        console.log(err)
        return { status: 'nok', message: err.message }
    }
}

const getTherapistWhoQuitQuery = async () => {
    try {
        const therapists = await Therapists.find({ verificationStatus: 'Granted', isActive: false }).select('-password').sort({ createdAt: -1 });
        return { therapists }
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    getTherapistsDetailsQuery,
    verifyTherapistQuery,
    deleteTherapistsQuery,
    editTherapistsQuery,
    getRejectedTherapistQuery,
    postRejectedReasonQuery,
    getTherapistWhoQuitQuery,
}
