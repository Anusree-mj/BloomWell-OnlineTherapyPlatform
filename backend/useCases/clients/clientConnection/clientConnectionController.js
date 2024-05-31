import clientConnectionQueries from "../../../infrastructure/dbQueries/client/clientConnectionQueries.js"

// get connections 
const getConnections = async (req, res) => {
    try {
        const clientId = req.params.clientId
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


export {
    getConnections,
}