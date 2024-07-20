
import Therapists from "../../../entities/therapists/therapist.js";
import Notifications from '../../../entities/users/notificationModel.js'
import Client from "../../../entities/clients/clients.js";
import Connections from "../../../entities/clients/connection.js";
import Feedback from "../../../entities/users/feedback.js";
import Reviews from "../../../entities/therapists/reviews.js";
import Bookings from "../../../entities/clients/bookings.js";
import Payments from "../../../entities/admin/adminPaymentModel.js";

const doQuit = async (therapistId, quitInfo) => {
    try {
        const query = { _id: therapistId }
        const update = { isActive: false, reasonForQuiting: quitInfo.reason }
        const options = { upsert: true }
        const response = await Therapists.updateOne(query, update, options);
        console.log('response', response)
        await Feedback.insertMany({
            userId: therapistId,
            userType: 'Therapists',
            feedback: quitInfo.feedback
        })
        await Notifications.insertMany({
            userId: therapistId,
            userType: 'Therapists',
            head: 'Biding Farewell',
            message: `Thank you for being part of BloomWell.
             Any pending payments will be promptly processed and sent to you. Best wishes for your future!`
        })

        const connectedClients = await Connections.find({ therapistId: therapistId, isActive: true });
        for (const item of connectedClients) {
            console.log('entered in for of')
            await Notifications.insertMany([{
                userId: item.clientId,
                userType: 'Client',
                head: 'Connection Updates',
                message: `Your therapist has decided to leave the platform. You can connect with another therapist. Sorry for the inconvenience!`
            }]);
            await Client.updateOne({ connectionId: item._id }, { isConnected: false })
            await Connections.updateOne({ _id: item._id }, { isActive: false, reasonForDisconnection: 'Therapist left platform' });
        }
        if (response.modifeidCount > 0) {
            return { status: 'ok' }
        } else {
            return { status: 'ok', message: 'Something went wrong' }

        }
    } catch (err) {
        console.log(err)
    }
}

const getReviews = async (therapistId) => {
    try {
        const reviews = await Reviews.find({ therapistId: therapistId }).populate('clientId', 'name')
        if (reviews) {
            return { status: 'ok', reviews }
        } else {
            return { status: 'nok', message: 'No reviews added yet' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getSchedulesDetails = async (therapistId) => {
    try {
        const schedules = await Bookings.find({ therapistId: therapistId }).populate('clientId', 'name').sort({ createdAt: -1 });
        if (schedules) {
            return { status: 'ok', schedules }
        } else {
            return { status: 'nok', message: 'No schedules added yet' }
        }
    } catch (err) {
        console.log(err)
    }
}

const updateSchedulesDetails = async (slotId, action, clientId, date, time) => {
    try {
        if (action === 'Rejected') {
            await Client.findByIdAndUpdate(clientId, { isActiveSlots: false });
        }

        const query = {
            _id: slotId,
        }
        const update = {
            verificationStatus: action,
            status: action === 'Accepted' ? 'Active' : 'Rejected'
        };
        const options = { upsert: false }
        const updateschedules = await Bookings.updateOne(query, update, options)
        console.log('updatedSchedules', updateschedules)
        if (updateschedules.modifiedCount > 0) {

            const content = action === 'Accepted' ? `Your live session have been scheduled on ${date} at ${time}.See you there.`
                : `Your request to have live session on ${date} at ${time} have been cancelled by yout therapist due to personal reasons.
                Please book another slot`
            await Notifications.insertMany({
                userId: clientId,
                userType: 'Client',
                head: 'Live Session Request Updated',
                message: content,
            })
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'No schedule found' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getPaymentsDetails = async (therapistId) => {
    try {
        const payments = await Payments.find({ therapistId: therapistId, paymentStatus: 'Completed' })
        if (payments) {
            return { status: 'ok', payments }
        } else {
            return { status: 'nok', message: 'No payments added yet' }
        }
    } catch (err) {
        console.log(err)
    }
}

const addData = async (data, key) => {
    try {
        const { value, clientId } = data;
        let updateClient
        if (key === 'Description') {
            const query = {
                _id: clientId
            }
            const update = { description: value };
            const options = { upsert: true }
            updateClient = await Client.updateOne(query, update, options)
        } else {
            console.log('key found in query', key)
            const query = {
                _id: clientId
            }
            const update = { remarks: value };
            const options = { upsert: true }
            updateClient = await Client.updateOne(query, update, options)
        }
        if (updateClient) {
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'No client found' }
        }
    } catch (err) {
        console.log(err)
    }
}

export default {
    doQuit,
    getReviews,
    getSchedulesDetails,
    updateSchedulesDetails,
    getPaymentsDetails,
    addData,
}