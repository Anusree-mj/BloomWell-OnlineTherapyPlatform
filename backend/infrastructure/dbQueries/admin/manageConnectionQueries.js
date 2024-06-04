import Connections from "../../../entities/clients/connection.js";

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
}