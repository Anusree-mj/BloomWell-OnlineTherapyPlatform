import Connections from "../../../entities/clients/connection.js"
import Client from "../../../entities/clients/clients.js"
import Feedback from "../../../entities/users/feedback.js";
import Bookings from "../../../entities/clients/bookings.js";


const getOngoingActivityDetails = async (clientId, therapistId) => {
    try {
        const ongoingActivities = await Bookings.find({
            clientId: clientId,
            therapistId: therapistId,
            verificationStatus: 'Accepted'
        }).sort({ updatedAt: -1 });
        const currentDate = new Date();

        for (const booking of ongoingActivities) {
            const bookingDate = new Date(booking.date);
            console.log('bokings found', booking)
            if (booking.sessionDuration && booking.sessionDuration !== '') {
                continue;
            }

            if (bookingDate < currentDate) {
                booking.status = 'Date passed';
            } else {
                booking.status = 'Current';
            }

            await booking.save();
        }
        return { status: 'ok', ongoingActivities }
    }
    catch (err) {
        console.log(err)
    }
}

const getAllActivities = async (clientId) => {
    try {
        const activities = await Connections.find({
            clientId: clientId,
            status: 'Accept',
            adminVerify: 'Accept'
        }).populate('therapistId', 'name').sort({ createdAt: -1 })
        if (activities.length > 0) {
            return { status: 'ok', activities }
        } else {
            return { status: 'nok', message: 'No activities found' }
        }
    }
    catch (err) {
        console.log(err)
    }
}

const addFeedback = async (clientId, feedback) => {
    try {
        const response = await Feedback.insertMany({
            userId: clientId,
            userType: 'Client',
            feedback: feedback
        })
        if (response) {
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Somehting went wrong' }
        }
    }
    catch (err) {
        console.log(err)
    }
}

const getAnyClientsDetailsQuery = async (clientId) => {
    try {
        console.log('reached query in get single')
        const client = await Client.findOne({ _id: clientId }).select('-password')
        console.log('passed client', client)
        return { client }
    }
    catch (err) {
        console.log(err)
    }
}


export default {
    getOngoingActivityDetails,
    addFeedback,
    getAnyClientsDetailsQuery,
    getAllActivities,
}