import Connections from "../../../entities/clients/connection.js"
import Client from "../../../entities/clients/clients.js"


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

export default {
    getOngoingActivityDetails,
}