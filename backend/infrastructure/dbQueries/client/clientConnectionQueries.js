import Client from "../../../entities/clients/clients.js";
import Therapists from "../../../entities/therapists/therapist.js";
import Connections from "../../../entities/clients/connection.js";

const connections = async (clientId) => {
    try {
        const client = await Client.findOne({ _id: clientId })
        const { sessionType, questionnaire } = client;
        const prefernce = questionnaire[questionnaire.length - 1];
        const matchCriteria = {
            expertise: { $in: [sessionType] },
            isVerified: true, isBlocked: false
        }
        if (prefernce !== 'Anyone') {
            matchCriteria.gender = prefernce
        }

        const therapists = await Therapists.aggregate([
            { $match: matchCriteria },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'therapistId',
                    as: 'reviews'
                }
            },
            { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    role: { $first: "$role" },
                    image: { $first: "$image" },
                    averageRating: { $avg: "$reviews.rating" }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    role: 1,
                    image: 1,
                    reviews: 1,
                    averageRating: { $ifNull: ["$averageRating", 0] }
                }
            }
        ])
        console.log('Therapistsssssssss', therapists)

        return { status: 'ok', therapists }
    } catch (err) {
        console.log(err)
        return { status: 'nok', message: err.message }
    }
}

const postConnection = async (clientId, therapistId) => {
    try {
        const therapist = await Therapists.findOne({ _id: therapistId });
        if (!therapist.isBlocked) {
            const createConnection = await Connections.insertMany({
                clientId: clientId,
                therapistId: therapistId,
            })
            if (createConnection) {
                return { status: 'ok', therapistName: therapist.name }
            }
        } else {
            return { status: 'nok', message: "Invalid therapist" }
        }
    } catch (err) {
        console.log(err)
        return { status: 'nok', message: err.message }
    }
}


export default {
    connections,
    postConnection,
    
}
