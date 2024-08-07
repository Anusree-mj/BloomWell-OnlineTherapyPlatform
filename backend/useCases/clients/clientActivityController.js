import clientActivityQueries from "../../infrastructure/dbQueries/client/clientActivityQueries.js";

// get connections 
const getOngoingActivitiesController = async (req, res) => {
    try {
        const clientId = req.user._id
        const therapistId = req.params.therapistId
        console.log('reached controller with idddddddddddddd', clientId, 'therapistdddddddd:', therapistId)
        const response = await clientActivityQueries.getOngoingActivityDetails(clientId, therapistId);
        if (response.status === 'ok') {
            const { status, ongoingActivities } = response
            res.status(200).json({ status, ongoingActivities });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// get connections 
const getAllActivityController = async (req, res) => {
    try {
        const clientId = req.user._id
        console.log('reached controller with clientIdd', clientId)
        const response = await clientActivityQueries.getAllActivities(clientId);
        if (response.status === 'ok') {
            const { status, activities } = response
            res.status(200).json({ status, activities });
        } else {
            const { status, message } = response
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// post feedback
const addFeedbackController = async (req, res) => {
    try {
        const clientId = req.user._id
        const { feedback } = req.body;
        console.log('reached feedaback controller')
        const response = await clientActivityQueries.addFeedback(clientId, feedback);
        if (response.status === 'ok') {
            const { status } = response
            console.log('feedback added successfully')
            res.status(200).json({ status: status });
        } else {
            const { status, message } = response
            console.log('feedback error occured')
            res.status(400).json({ status: status, message: message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

// get single client
const getAnyClientDetailsController = async (req, res) => {
    try {
        const clientId = req.params.clientId
        console.log('got client id sdaf', clientId)
        const { client } = await clientActivityQueries.getAnyClientsDetailsQuery(clientId)
        if (client) {
            res.status(200).json({
                status: 'ok',
                client: client
            });
        }
    } catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log(err)
    }
}

export {
    getOngoingActivitiesController,
    addFeedbackController,
    getAnyClientDetailsController,
    getAllActivityController,

}