import Client from "../../../entities/clients/clients.js";
import Therapists from "../../../entities/therapists/therapist.js";
import Connections from "../../../entities/clients/connection.js";
import Notifications from "../../../entities/users/notificationModel.js";

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
            await Notifications.insertMany({
                userId: clientId,
                userType: 'Client',
                head: 'Connection Request Sent',
                message: `Your connection request to Dr. ${therapist.name} has been successfully sent and is now under verification. We will notify you once it's completed. Stay Happy, Stay Healthy!`,
            })
            const createConnection = await Connections.insertMany({
                clientId: clientId,
                therapistId: therapistId,
            })
            if (createConnection.length > 0) {
                const connectionId = createConnection[0]._id;
                console.log('connectionId fot', connectionId);
                await Client.findByIdAndUpdate(clientId, { connectionId: connectionId, isConnected: true });

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

const disconnect = async (clientId, connectionId, reason) => {
    try {
        await Client.findByIdAndUpdate(clientId, { isConnected: false });
        const query = { _id: connectionId };
        const update = {
            isActive: false,
            reasonForDisconnection: reason
        }
        const options = { upsert: true };
        const response = await Connections.updateOne(query, update, options)
        if (response.modifiedCount > 0) {
            return { status: 'ok' }
        }
        else {
            return { status: 'nok', message: "Invalid connection id" }
        }
    } catch (err) {
        console.log(err)
        return { status: 'nok', message: err.message }
    }
}


export default {
    connections,
    postConnection,
    disconnect,
}
