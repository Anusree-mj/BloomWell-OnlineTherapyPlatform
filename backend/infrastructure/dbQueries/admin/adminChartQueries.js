import Feedback from "../../../entities/users/feedback.js";
import Client from "../../../entities/clients/clients.js";
import Therapists from "../../../entities/therapists/therapist.js";

// get dashboard details
const getDashboardDetailsQuery = async () => {
    try {
        const currentYear = new Date().getFullYear();
        const totalClients = await Client.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lt: new Date(currentYear + 1, 0, 1)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" }
                    },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    count: 1
                }
            },
            { $sort: { month: 1 } }
        ])
        const totalSubscribedClients = await Client.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lt: new Date(currentYear + 1, 0, 1)
                    },
                    isSubscribed: true
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" }
                    },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    count: 1
                }
            },
            { $sort: { month: 1 } }
        ]);

        const totalTherapists = await Therapists.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lt: new Date(currentYear + 1, 0, 1)
                    },
                    verificationStatus: 'Granted'
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" }
                    },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    count: 1
                }
            },
            { $sort: { month: 1 } }
        ])

        const totalActiveTherapists = await Therapists.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lt: new Date(currentYear + 1, 0, 1)
                    },
                    isActive: true
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" }
                    },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    count: 1
                }
            },
            { $sort: { month: 1 } }
        ]);

        const dashboardDetails = {totalClients,totalSubscribedClients,totalTherapists,totalActiveTherapists}
        return { status: 'ok', dashboardDetails }
    } catch (err) {
        console.log(err)
    }
}

export default {
    getDashboardDetailsQuery,

}
