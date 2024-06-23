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


export default {
    getFeedbackQueries,

}
