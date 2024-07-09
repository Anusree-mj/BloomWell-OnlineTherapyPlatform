import Feedback from "../../../entities/users/feedback.js";
import Client from "../../../entities/clients/clients.js";
import Therapists from "../../../entities/therapists/therapist.js";
import Reviews from "../../../entities/therapists/reviews.js";

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

        const dashboardDetails = { totalClients, totalSubscribedClients, totalTherapists, totalActiveTherapists }
        return { status: 'ok', dashboardDetails }
    } catch (err) {
        console.log(err)
    }
}

const getTherapyCount = async () => {
    try {
        const therapyCount = await Client.aggregate([

            { $group: { _id: '$sessionType', totalCount: { $sum: 1 } } }
        ])
        if (therapyCount) {

            return { status: 'ok', therapyCount }
        } else {
            return { status: 'nok', message: 'Something ' }
        }
    }
    catch (err) {
        console.log(err)
    }
}

const top5Therapists = async () => {
    try {
        const top5Therapists = await Reviews.aggregate([
            {
                $group: {
                    _id: '$therapistId',
                    totalRatings: { $sum: '$rating' },
                    count: { $sum: 1 } // Count the number of reviews per therapist
                }
            },
            {
                $lookup: {
                    from: 'therapists',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'therapistInfo'
                }
            },
            { $unwind: '$therapistInfo' },
            {
                $project: {
                    _id: 1,
                    totalRatings: 1,
                    count: 1,
                    therapistId: '$_id',
                    therapistName: '$therapistInfo.name',
                    therapistImage: '$therapistInfo.image',
                    averageRating: { $divide: ['$totalRatings', '$count'] } // Calculate average rating
                }
            },
            { $sort: { averageRating: -1 } }, // Sort by averageRating to get top therapists
            { $limit: 3 } // Limit to top 5 therapists
        ]);

        if (top5Therapists.length > 0) {
            return { status: 'ok', top5Therapists };
        } else {
            return { status: 'nok', message: 'No therapists found' };
        }
    } catch (err) {
        console.error('Error:', err);
        return { status: 'error', message: err.message };
    }
}




export default {
    getDashboardDetailsQuery,
    getTherapyCount,
    top5Therapists,

}
