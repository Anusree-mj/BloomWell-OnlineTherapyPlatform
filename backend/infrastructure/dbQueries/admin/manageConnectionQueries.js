import Connections from "../../../entities/clients/connection.js";
import Notifications from '../../../entities/users/notificationModel.js'
import Client from "../../../entities/clients/clients.js";

const getConnectionRequests = async () => {
    try {
        console.log('reached connetion query')
        const connections = await Connections.find()
            .populate('clientId', 'name email')
            .populate('therapistId', 'name email').sort({ createdAt: -1 });
        if (connections) {
            return { status: 'ok', connections }
        } else {
            return { status: 'nok', message: 'No data' }
        }
    } catch (err) {
        console.log(err)
    }
}

const manageConnectionRequest = async (connectionStatus, connectionId) => {
    try {
        const query = { _id: connectionId }
        const update = { adminVerify: connectionStatus }
        const options = { upsert: false }
        const response = await Connections.updateOne(query, update, options)
        if (response.modifiedCount <= 1) {
            const connection = await Connections.findById(connectionId)
                .populate('therapistId', 'name');
            const therapistName = connection.therapistId.name;
            const clientId = connection.clientId;
            if (connectionStatus === 'Accept') {
                await checkActiveConnection(connectionId, therapistName, clientId);
            } else {
                await Client.findByIdAndUpdate(clientId, { isConnected: false });
                await Notifications.insertMany({
                    userId: clientId,
                    userType: 'Client',
                    head: 'Connection Request Updated',
                    message: 'We regret to inform you that your connection request was declined. Please feel free to connect with other therapists. If you need assistance, contact our support team.',
                })
            }
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Connection request not found' }
        }
    } catch (err) {
        console.log(err)
    }
}

export const checkActiveConnection = async (connectionId, therapistName, clientId) => {
    try {
        console.log('reached checkactive function')
        const query = {
            _id: connectionId,
            adminVerify: 'Accept',
            status: 'Accept'
        }
        const update = { isActive: true };
        const options = { upsert: false }
        await Connections.updateOne(query, update, options)
        const message = `Your connection request has been accepted by ${therapistName}. You can now start your sessions. Welcome aboard!`;
        const updateNotification = await Notifications.insertMany({
            userId: clientId,
            userType: 'Client',
            head: 'Connection Request Updated',
            message: message,
        })
        console.log('update notif', updateNotification)
        return;
    } catch (err) {
        console.log(err.message)
    }
}

export default {
    getConnectionRequests,
    manageConnectionRequest,
}