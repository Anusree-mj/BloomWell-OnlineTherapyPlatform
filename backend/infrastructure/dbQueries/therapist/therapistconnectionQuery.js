import Connections from "../../../entities/clients/connection.js";

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

export default {
    getConnectionRequests,
}