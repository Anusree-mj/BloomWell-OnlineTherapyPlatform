import therapyBookingsQuery from '../../infrastructure/dbQueries/therapist/therapyBookingsQuery.js';


const addAvailabilityController = async (req, res) => {
    try {
        const therapistId = req.user._id;
        const { availability } = req.body;
        console.log('reached availability add controller with id:', therapistId, 'with data:', availability)
        const { status } = await therapyBookingsQuery.addTherapistAvailability(therapistId.toString(), availability)
        if (status === 'ok') {
            res.status(200).json({ status });
        } else {
            res.status(400).json({ status, message: 'No data found' });
        }
    } catch (err) {
        console.log(err)
    }

}

const getAvailableSlotsController = async (req, res) => {
    try {
        const therapistId = req.params.therapistId;
        console.log('reached availability add controller with id:', therapistId)
        const response = await therapyBookingsQuery.getAvailableSlots(therapistId)
        if (response.status === 'ok') {
            const { status, slots } = response
            res.status(200).json({ status, slots });
        } else {
            const { status, message } = response
            res.status(400).json({ status, message });
        }
    } catch (err) {
        console.log(err)
    }

}

export {
    addAvailabilityController,
    getAvailableSlotsController,

}