import Bookings from "../../../entities/clients/bookings.js";
import Client from "../../../entities/clients/clients.js";
import Therapists from "../../../entities/therapists/therapist.js";
import Payments from "../../../entities/admin/adminPaymentModel.js";
import pkg from 'rrule';
const { RRule } = pkg;


const addTherapistAvailability = async (therapistId, availability, startTime, endTime) => {
    try {
        const updateTherapist = await Therapists.findByIdAndUpdate(therapistId,
            {
                availability: availability,
                availableTimeFrom: startTime,
                availableTimeTo: endTime
            });
        if (updateTherapist) {
            console.log('updated therapists', updateTherapist)
            return { status: 'ok' }
        } else {
            return { status: 'nok' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getAvailableSlots = async (therapistId) => {
    try {
        console.log('rrule', RRule)
        const therapist = await Therapists.findById(therapistId)
        console.log('therapist availabilit found', therapist.availability)
        if (!therapist.availability) {
            return { status: 'nok', message: `Therapist haven't added available slots` };
        }
        const rule = RRule.fromString(`${therapist.availability}`);
        console.log('fssdfsadfsdaf', rule)
        const now = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(now.getMonth() + 1);

        const slots = rule.between(now, nextMonth);
        console.log('available slots', slots)
        return {
            status: 'ok', slots, availableFrom: therapist.availableTimeFrom,
            availableTo: therapist.availableTimeTo
        }
    } catch (err) {
        console.log(err)
    }
}

const postClientSlotBooking = async (clientId, therapistId, date, time) => {
    try {
        const addSlot = await Bookings.insertMany({
            clientId: clientId,
            therapistId: therapistId,
            date: date,
            time: time,
        })
        if (addSlot) {
            const addedSlotId = addSlot[0]._id;
            console.log('addsloteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', addSlot);
            console.log('addsloteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:', addedSlotId);

            await Client.findByIdAndUpdate(clientId, { isActiveSlots: true, activeSlotId: addedSlotId });
            console.log('added slotss', addSlot)
            return { status: 'ok', addedSlotId }
        } else {
            return { status: 'nok' }
        }
    } catch (err) {
        console.log(err)
    }
}

const getActiveSlotDetails = async (slotId) => {
    try {
        const slotDetails = await Bookings.findById(slotId)
        if (slotDetails) {
            console.log('slot found:', slotDetails)
            return { status: 'ok', slotDetails }
        } else {
            return { status: 'nok', message: 'Slot not found' }
        }
    } catch (err) {
        console.log(err)
    }
}

const cancelSlot = async (slotId, clientId) => {
    try {
        const query = {
            _id: slotId,
        }
        const update = { status: 'Cancelled' };
        const options = { upsert: true }
        const updateSlot = await Bookings.updateOne(query, update, options)

        console.log('slot updated:', updateSlot)
        if (updateSlot.modifiedCount > 0) {
            await Client.findByIdAndUpdate(clientId, { isActiveSlots: false });
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Slot not found' }
        }
    } catch (err) {
        console.log(err)
    }
}

const updateSlotStarting = async (data) => {
    try {
        const { sessionStart, roomID } = data;
        const client = await Client.findById(roomID);
        const bookingId = client.activeSlotId;

        const query = {
            _id: bookingId,
        }
        const update = {
            sessionStart: sessionStart,
        };
        const options = { upsert: true }
        const updatedSlot = await Bookings.updateOne(query, update, options)

        console.log('slot updated:', updatedSlot)
        if (updatedSlot.modifiedCount > 0) {
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Slot not found' }
        }
    } catch (err) {
        console.log(err)
    }
}

const updateSlot = async (data) => {
    try {
        const { sessionEnd, roomID } = data;
        const client = await Client.findById(roomID).populate('connectionId', 'therapistId');
        console.log('client founddddddddddddd', client)
        const { isActiveSlots, activeSlotId, connectionId } = client;
        const { therapistId } = connectionId;
        console.log('therapisteeeeeeeeeeeeeeeeeee', therapistId)
        if (!isActiveSlots) return { status: 'ok' }

        const slot = await Bookings.findById(activeSlotId);
        console.log('sloteeeeeeeeeeeee', slot)

        const sessionStartMinutes = timeToMinutes(slot.sessionStart);
        const sessionEndMinutes = timeToMinutes(sessionEnd);
        const durationInMinutes = sessionEndMinutes - sessionStartMinutes;
        const durationInHours = Math.floor(durationInMinutes / 60);
        const remainingMinutes = durationInMinutes % 60;
        const sessionDuration = `${durationInHours}:${remainingMinutes.toString().padStart(2, '0')}`;

        const query = {
            _id: activeSlotId,
        }
        const update = {
            status: 'Completed',
            sessionEnd: sessionEnd,
            sessionDuration: sessionDuration
        };
        const options = { upsert: true }
        const updatedSlot = await Bookings.updateOne(query, update, options)

        console.log('slot updated:', updatedSlot)
        if (updatedSlot.modifiedCount > 0) {

            await Therapists.findByIdAndUpdate(therapistId, {
                $inc: { totalLiveSessionPerMonth: 1 }
            })

            await Client.findByIdAndUpdate(roomID, { isActiveSlots: false });
            return { status: 'ok' }
        } else {
            return { status: 'nok', message: 'Slot not found' }
        }
    } catch (err) {
        console.log(err)
    }
}

const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export default {
    addTherapistAvailability,
    getAvailableSlots,
    postClientSlotBooking,
    getActiveSlotDetails,
    cancelSlot,
    updateSlot,
    updateSlotStarting,

}