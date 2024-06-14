import adminActivityQuery from "../../../infrastructure/dbQueries/admin/adminActivityQuery.js";

// admin feedback
const getFeedbackControllers = async (req, res) => {
    try {
        const response = await adminActivityQuery.getFeedbackQueries()
        if (response.status) {
            const { status, feedbacks } = response
            console.log('feedbacks', feedbacks)
            res.status(200).json({ status, feedbacks });
        }
    } catch (err) {
        console.log('Error found', err)
        res.status(400).json({ status: 'nok', message: err.message });
    }
}



export {
    getFeedbackControllers,
}