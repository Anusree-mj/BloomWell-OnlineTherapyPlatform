import therapistConnectionQueries from '../../../infrastructure/dbQueries/therapist/therapistconnectionQuery.js'

// connections get
const getConnectionRequestController = async (req, res) => {
    try {
        console.log('reached controller')
        const therapistId = req.user._id;
        console.log('therapist id in controller', therapistId)
        const response = await therapistConnectionQueries.getConnectionRequests(therapistId.toString())
        if (response.status === 'ok') {
            const { status, connections } = response
            res.status(200).json({ status: status, connections: connections });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const manageConnectionRequestController = async (req, res) => {
    try {
        console.log('reached controller')
        const { connectionStatus, connectionId } = req.body;
        const response = await therapistConnectionQueries.manageConnectionRequest(connectionStatus, connectionId)
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}


// rejected connections get
const getRejectedConnectionsController = async (req, res) => {
    try {
        console.log('reached controller')
        const therapistId = req.user._id;
        console.log('therapist id in controller', therapistId)
        const response = await therapistConnectionQueries.getRejectedConnections(therapistId.toString())
        if (response.status === 'ok') {
            const { status, connections } = response
            res.status(200).json({ status: status, connections: connections });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    getConnectionRequestController,
    manageConnectionRequestController,
    getRejectedConnectionsController,

}
