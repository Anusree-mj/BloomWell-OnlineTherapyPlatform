import therapistActivityQueries from '../../infrastructure/dbQueries/therapist/therapistActivityQueries.js';
import therapistConnectionQueries from '../../infrastructure/dbQueries/therapist/therapistconnectionQuery.js'

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

// post rejected reason
const postConnectionRejectionReasonController = async (req, res) => {
    try {
        const { reason, reasonId } = req.body
        const response = await therapistConnectionQueries.postRejectedReasonQuery(reasonId, reason);
        if (response.status === 'ok') {
            res.status(200).json({ status: response.status });
        } else {
            const { status, message } = response
            res.status(200).json({ status: status, message: message });
        }
    }
    catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)
    }
}

// get active connection
const getActiveConnectionController = async (req, res) => {
    try {
        const therapistId = req.user._id;
        console.log('therapist id in active controller', therapistId)
        const response = await therapistConnectionQueries.getActiveConnections(therapistId.toString())
        if (response.status === 'ok') {
            const { status, connections } = response
            console.log('connections', connections)
            res.status(200).json({ status: status, connections: connections });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    }
    catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)
    }
}

// get in active connection
const getInActiveConnectionController = async (req, res) => {
    try {
        const therapistId = req.user._id;
        console.log('therapist id in active controller', therapistId)
        const response = await therapistConnectionQueries.getInActiveConnections(therapistId.toString())
        if (response.status === 'ok') {
            const { status, connections } = response
            res.status(200).json({ status: status, connections: connections });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    }
    catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)
    }
}

// get reviews and ratings
const getReviewsController = async (req, res) => {
    try {
        const therapistId = '665823f1d24d379a63c35c5b';
        console.log('therapist id in active controller', therapistId)
        const response = await therapistActivityQueries.getReviews(therapistId)
        if (response.status === 'ok') {
            const { status, reviews } = response
            res.status(200).json({ status, reviews });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    }
    catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)
    }
}

export {
    getConnectionRequestController,
    manageConnectionRequestController,
    getRejectedConnectionsController,
    postConnectionRejectionReasonController,
    getActiveConnectionController,
    getInActiveConnectionController,
    getReviewsController,
}
