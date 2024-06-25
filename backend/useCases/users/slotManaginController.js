import therapyBookingsQuery from '../../infrastructure/dbQueries/user/therapyBookingsQuery.js';


const addAvailabileSlotsController = async (req, res) => {
    try {
        const therapistId = req.user._id;
        const { availability, startTime, endTime } = req.body;
        console.log('reached availability add controller with id:', therapistId, 'with data:', availability)
        const { status } = await therapyBookingsQuery
            .addTherapistAvailability(therapistId.toString(), availability, startTime, endTime)
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
            const { status, slots, availableFrom, availableTo } = response
            res.status(200).json({ status, slots, availableFrom, availableTo });
        } else {
            const { status, message } = response
            res.status(400).json({ status, message });
        }
    } catch (err) {
        console.log(err)
    }

}

const postBookedSlotController = async (req, res) => {
    try {
        const clientId = req.user._id;
        const therapistId = req.params.therapistId;
        const { date, time } = req.body
        console.log('reached availability post controller with id:', therapistId, 'with datae:', date, 'time:', time)
        const response = await therapyBookingsQuery.postClientSlotBooking(clientId, therapistId, date, time)
        if (response.status === 'ok') {
            res.status(200).json({ status: 'ok' });
        } else {
            res.status(400).json({ status: 'nok', message: 'Something went wrong' });
        }
    } catch (err) {
        console.log(err)
    }

}

export {
    addAvailabileSlotsController,
    getAvailableSlotsController,
    postBookedSlotController,
    
}