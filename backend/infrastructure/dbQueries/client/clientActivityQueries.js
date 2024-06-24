import Connections from "../../../entities/clients/connection.js"
import Client from "../../../entities/clients/clients.js"
import Feedback from "../../../entities/users/feedback.js";


const getOngoingActivityDetails = async (clientId) => {
    try {
        const client = await Client.findOne({ _id: clientId })
        if (client.isConnected) {
            const clientConnection = await Connections.findOne({ _id: client.connectionId }).populate(
                'therapistId', 'name'
            )
            const connectionDetails = {
                therapistName: clientConnection.therapistId.name,
                isActive: clientConnection.isActive
            };
            return { status: 'ok', connectionDetails }
        } else {
            console.log('No ongoing activity')
            return { status: 'nok', message: 'Client not connected' }
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
}