import manageConnectionQueries from "../../../infrastructure/dbQueries/admin/manageConnectionQueries.js"

// get all connection requests
const getAllConnectionRequestController = async (req, res) => {
    try {
        console.log('reached admin controller')
        const response = await manageConnectionQueries.getConnectionRequests()
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
export {
    getAllConnectionRequestController,
    manageConnectionRequestController,

}
