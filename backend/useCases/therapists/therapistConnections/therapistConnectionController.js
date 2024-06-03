import therapistConnectionQueries from '../../../infrastructure/dbQueries/therapist/therapistconnectionQuery.js'

// signup
const getConnectionRequestController = async (req, res) => {
    try {
        console.log('reached controller')
        const therapistId = req.user._id;
        console.log('therapist id in controller', therapistId)
        const response = await therapistConnectionQueries.getConnectionRequests(therapistId.toString())
        if (response.status === 'ok') {
            const { status, connections } = response
            res.status(200).json({ status: 'ok', connections: connections });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    getConnectionRequestController
}
