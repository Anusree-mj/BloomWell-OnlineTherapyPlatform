import therapistActivityQueries from "../../infrastructure/dbQueries/therapist/therapistActivityQueries.js";


const getSchedulesController = async (req, res) => {
    try {
        const therapistId = req.user._id;
        console.log('therapist id in controller', therapistId)
        const response = await therapistActivityQueries.getSchedulesDetails(therapistId.toString())
        if (response.status === 'ok') {
            const { status, schedules } = response
            res.status(200).json({ status, schedules });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

const updateScheduleController = async (req, res) => {
    try {
        const { scheduleId, action, clientId, date, time } = req.body;
        const response = await therapistActivityQueries.updateSchedulesDetails(scheduleId,
            action, clientId, date, time
        )
        if (response.status === 'ok') {
            res.status(200).json({ status: 'ok' });
        } else {
            const { message } = response
            res.status(400).json({ status: 'nok', message });
        }
    } catch (err) {
        console.log('Error found', err)
    }
}

export {
    getSchedulesController,
    updateScheduleController,
}