import Feedback from "../../../entities/users/feedback.js";
import Client from "../../../entities/clients/clients.js";
import Therapists from "../../../entities/therapists/therapist.js";

// get feedbacks
const getFeedbackQueries = async () => {
    try {
        let name;
        const feedbacks = await Feedback.find()
        for (const feedback of feedbacks) {
            if (feedback.userType === 'Client') {
                const client = await Client.findOne({ _id: feedback.userId })
                name = client ? client.name : 'Unknown';
            } else {
                const therapist = await Therapists.find({ _id: feedback.userId }, { _id: 0, name: 1 })
                name = therapist ? therapist.name : 'Unknown'
            }
            feedback.set('userName', name, { strict: false });
        }
        if (feedbacks.length > 0) {
            return { status: 'ok', feedbacks }
        } else {
            return { status: 'nok', message: 'No feedbacks yet' }
        }
    }
    catch (err) {
        console.log(err)
    }
}

// get dashboard details
const getDashboardDetailsQuery = async () => {
    try {
        const dashboardDetails = {}
        const getTotalClients = await Client.aggregate([
            { $match: { isAnUser: true } },
            { $count: 'totalClients' }
        ])
        const totalClients = getTotalClients.length > 0 ? getTotalClients[0].totalClients : 0
        dashboardDetails.totalClients = totalClients;

        const getTotalSubscribedClient = await Client.aggregate([
            { $match: { isSubscribed: true } },
            { $count: 'totalSubscribedClients' }
        ])
        const totalSubscribedClients = getTotalSubscribedClient.length > 0 ? getTotalSubscribedClient[0].totalSubscribedClients : 0
        dashboardDetails.totalSubscribedClients = totalSubscribedClients;

        const getTotalTherapists = await Therapists.aggregate([
            { $match: { isActive: true } },
            { $count: 'totalTherapists' }
        ])
        const totalTherapists = getTotalTherapists.length > 0 ? getTotalTherapists[0].totalTherapists : 0
        dashboardDetails.totalTherapists = totalTherapists;

        const getTotalActiveTherapists = await Therapists.aggregate([
            { $match: { isActive: false } },
            { $count: 'totalActiveTherapists' }
        ])
        const totalActiveTherapists = getTotalActiveTherapists.length > 0 ? getTotalActiveTherapists[0].totalActiveTherapists : 0
        dashboardDetails.totalActiveTherapists = totalActiveTherapists;
        
        if (Object.keys(dashboardDetails).length > 0) {
            return { status: 'ok', dashboardDetails }
        } else {
            return { status: 'nok', message: 'Something went wrong' }
        }
    } catch (err) {
        console.log(err)
    }
}

export default {
    getFeedbackQueries,
    getDashboardDetailsQuery,

}
