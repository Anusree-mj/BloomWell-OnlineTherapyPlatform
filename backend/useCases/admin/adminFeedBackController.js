import adminActivityQuery from "../../infrastructure/dbQueries/admin/adminActivityQuery.js";
import adminChartQueries from "../../infrastructure/dbQueries/admin/adminChartQueries.js";
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
// dashboard details
const getDashboardDetailsControllers = async (req, res) => {
    try {
        console.log('reached dashoard controllerrr')
        const response = await adminChartQueries.getDashboardDetailsQuery()
        if (response.status) {
            console.log('passing details')
            const { status, dashboardDetails} = response
            res.status(200).json({ status, dashboardDetails});
        } else {
            const { status, message } = response
            res.status(400).json({ status, message });
        }
    } catch (err) {
        console.log('Error found', err)
        res.status(400).json({ status: 'nok', message: err.message });
    }
}


export {
    getFeedbackControllers,
    getDashboardDetailsControllers,
    
}