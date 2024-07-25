import Connections from "../../../entities/clients/connection.js";
import Client from "../../../entities/clients/clients.js";
import { checkActiveConnection } from "../admin/manageConnectionQueries.js";
import Notifications from "../../../entities/users/notificationModel.js";

const getConnectionRequests = async (therapistId) => {
    try {
        console.log('therapist id ', therapistId)
        const connections = await Connections.find({ therapistId: therapistId })
            .populate('clientId', 'name email').sort({ createdAt: -1 });

        if (connections) {
            return { status: 'ok', connections }
        } else {
            return { status: 'nok', message: 'No data' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getRejectedConnections = async (therapistId) => {
    try {
        console.log('therapist id in rejected query ', therapistId)
        const connections = await Connections.find({ therapistId: therapistId, status: 'Reject' })
            .populate('clientId', 'name email').sort({ createdAt: -1 });

        if (connections) {
            return { status: 'ok', connections }
        } else {
            return { status: 'nok', message: 'No data' }
        }
    } catch (err) {
        console.log(err)
    }
}

const postRejectedReasonQuery = async (connectionId, reason) => {
    try {
        console.log('Readched post rejection reason query')
        const connection = await Connections.findOne({ _id: connectionId });
        const clientId = connection.clientId;
        console.log('clientId got', clientId)
        const message = `We regret to inform you that your connection request was declined due to: "${reason}". Please feel free to connect with other therapists. If you need assistance, contact our support team.`;

        await Notifications.insertMany({
            userId: clientId,
            userType: 'Client',
            head: 'Connection Request Updated',
            message: message,
        })
        const query = { _id: connectionId };
        const update = { reasonForRejection: reason };
        const options = { upsert: true };
        const updatedConnection = await Connections.updateOne(query, update, options);
        if (updatedConnection.modifiedCount > 0) {
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

const manageConnectionRequest = async (connectionStatus, connectionId) => {
    try {
        const query = { _id: connectionId }
        const update = { status: connectionStatus }
        const options = { upsert: false }
        const response = await Connections.updateOne(query, update, options);
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
                    message: 'We regret to inform you that your connection request was declined. We will let you know the reason. On the meantime Please feel free to connect with other therapists. If you need assistance, contact our support team.',
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

const getActiveConnections = async (therapistId) => {
    try {
        console.log('therapist id ', therapistId)
        const connections = await Connections.find({ therapistId: therapistId, isActive: true })
            .populate('clientId', 'name email description').sort({ createdAt: -1 });

        if (connections) {
            return { status: 'ok', connections }
        } else {
            return { status: 'nok', message: 'No data' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getInActiveConnections = async (therapistId) => {
    try {
        console.log('therapist id ', therapistId)
        const connections = await Connections.find({
            therapistId: therapistId, isActive: false, status: 'Accept', adminVerify: 'Accept'
        })
            .populate('clientId', 'name email').sort({ createdAt: -1 });

        if (connections) {
            return { status: 'ok', connections }
        } else {
            return { status: 'nok', message: 'No data' }
        }
    } catch (err) {
        console.log(err)
    }
}


export default {
    getConnectionRequests,
    manageConnectionRequest,
    getRejectedConnections,
    postRejectedReasonQuery,
    getActiveConnections,
    getInActiveConnections,
}