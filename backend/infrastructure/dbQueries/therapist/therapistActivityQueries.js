
import Therapists from "../../../entities/therapists/therapist.js";
import Notifications from '../../../entities/users/notificationModel.js'
import Client from "../../../entities/clients/clients.js";
import Connections from "../../../entities/clients/connection.js";

const doQuit = async (therapistId, quitInfo) => {
    try {
        const query = { _id: therapistId }
        const update = { isActive: false, reasonForQuiting: quitInfo.reason, feedback: quitInfo.feedback }
        const options = { upsert: true }
        const response = await Therapists.updateOne(query, update, options);
        console.log('response', response)
        await Notifications.insertMany({
            userId: therapistId,
            userType: 'Therapists',
            head: 'Biding Farewell',
            message: `Thank you for being part of BloomWell.
             Any pending payments will be promptly processed and sent to you. Best wishes for your future!`
        })

        const connectedClients = await Connections.find({ therapistId: therapistId, isActive: true });
        console.log("connected clients", connectedClients)
        for (const item of connectedClients) {
            console.log('entered in for of')
            await Notifications.insertMany([{
                userId: item.clientId,
                userType: 'Client',
                head: 'Connection Updates',
                message: `Your therapist has decided to leave the platform. You can connect with another therapist. Sorry for the inconvenience!`
            }]);
            await Client.updateOne({ connectionId: item._id }, { isConnected: false })
            await Connections.updateOne({ _id: item._id }, { isActive: false });
        }
        if (response.modifeidCount > 0) {
            return { status: 'ok' }
        } else {
            return { status: 'ok', message: 'Something went wrong' }

        }
    } catch (err) {
        console.log(err)
    }
}

export default { doQuit }