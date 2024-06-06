import clientActivityQueries from "../../../infrastructure/dbQueries/client/clientActivityQueries.js";

// get connections 
const getOngoingActivitiesController = async (req, res) => {
    try {
        const clientId = req.user._id
        const response = await clientActivityQueries.getOngoingActivityDetails(clientId);
        if (response.status === 'ok') {
            const { status, connectionDetails } = response
            console.log('response in getongoing controller pased')
            res.status(200).json({ status: status, connectionDetails: connectionDetails });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}


export {
    getOngoingActivitiesController,
}