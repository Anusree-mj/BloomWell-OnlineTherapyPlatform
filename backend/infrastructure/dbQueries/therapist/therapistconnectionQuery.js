import Connections from "../../../entities/clients/connection.js";
import { checkActiveConnection } from "../admin/manageConnectionQueries.js";

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
            await checkActiveConnection(connectionId, therapistName, clientId);
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Connection request not found' }
        }

    } catch (err) {
        console.log(err)
    }
}

export default {
    getConnectionRequests,
    manageConnectionRequest,
    getRejectedConnections,

}