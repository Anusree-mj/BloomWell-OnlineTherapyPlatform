import clientConnectionQueries from "../../../infrastructure/dbQueries/client/clientConnectionQueries.js"

// get connections 
const getConnectionController = async (req, res) => {
    try {
        const clientId = req.user._id
        console.log(clientId.toString(),'clientidddddddddddddddd')
        const response = await clientConnectionQueries.connections(clientId)
        if (response.status === 'ok') {
            const { status, therapists } = response
            res.status(200).json({ status: status, therapists: therapists });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// post connection
const postConnectionController = async (req, res) => {
    try {
        console.log('reached in controller')
        const clientId = req.user._id
        const { therapistId } = req.body;
        const response = await clientConnectionQueries.postConnection(clientId, therapistId)
        if (response.status === 'ok') {
            const { status, therapistName } = response
            console.log('therapistname found', therapistName)
            res.status(200).json({ status: status, therapistName: therapistName });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    getConnectionController,
    postConnectionController,
}