import Feedback from "../../../entities/users/feedback.js";
import Client from "../../../entities/clients/clients.js";
import Therapists from "../../../entities/therapists/therapist.js";

// get dashboard details
const getDashboardDetailsQuery = async () => {
    try {
        const currentYear = new Date().getFullYear();
        const clientDetails = await Client.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lt: new Date(currentYear + 1, 0, 1)
                    }
                }
            },
            {
                $facet: {
                    totalClients: [
                        {
                            $group: {
                                _id: {
                                    month: { $month: "$createdAt" }
                                },
                                totalClients: { $count: {} }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                month: "$_id.month",
                                totalClients: 1
                            }
                        },
                        { $sort: { month: 1 } }
                    ],
                    totalSubscribedClients: [
                        {
                            $match: { isSubscribed: true }
                        },
                        {
                            $group: {
                                _id: {
                                    month: { $month: "$createdAt" }
                                },
                                totalSubscribedClients: { $count: {} }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                month: "$_id.month",
                                totalSubscribedClients: 1
                            }
                        },
                        { $sort: { month: 1 } }
                    ]
                }
            }
        ]);
        const therapistDetails = await Therapists.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lt: new Date(currentYear + 1, 0, 1)
                    }
                }
            },
            {
                $facet: {
                    totalTherapists: [
                        {
                            $match: { verificationStatus: 'Granted' }
                        },
                        {
                            $group: {
                                _id: {
                                    month: { $month: "$createdAt" }
                                },
                                totalClients: { $count: {} }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                month: "$_id.month",
                                totalClients: 1
                            }
                        },
                        { $sort: { month: 1 } }
                    ],
                    totalActiveTherapists: [
                        {
                            $match: { isActive: true }
                        },
                        {
                            $group: {
                                _id: {
                                    month: { $month: "$createdAt" }
                                },
                                totalSubscribedClients: { $count: {} }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                month: "$_id.month",
                                totalSubscribedClients: 1
                            }
                        },
                        { $sort: { month: 1 } }
                    ]
                }
            }
        ]);
        const dashboardDetails = [...clientDetails, ...therapistDetails]
        return { status: 'ok', dashboardDetails  }

    } catch (err) {
        console.log(err)
    }
}

export default {
    getDashboardDetailsQuery,

}
