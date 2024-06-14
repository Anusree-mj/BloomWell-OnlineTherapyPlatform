import therapistActivityQueries from "../../../infrastructure/dbQueries/therapist/therapistActivityQueries.js";

const doQuitController = async (req, res) => {
    try {
        const therapistId = req.user._id;
        console.log('therapist id in quit controller', therapistId)
        const { quitInfo } = req.body
        const response = await therapistActivityQueries.doQuit(therapistId.toString(), quitInfo)
        if (response.status === 'ok') {
            const { status } = response
            res.status(200).json({ status: status });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message: message });
        }
    }
    catch (err) {
        res.status(401).json({ status: 'nok', message: err.message })
        console.log('Error found', err)
    }
}

export  {
    doQuitController
}