import TempUser from "../../../entities/users/tempUsersModel.js";
import Client from "../../../entities/clients/clients.js";
import bcrypt from 'bcryptjs';
import User from "../../../entities/users/userModel.js";
import Therapists from "../../../entities/therapists/therapist.js";


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


export default {
    connections,
}
