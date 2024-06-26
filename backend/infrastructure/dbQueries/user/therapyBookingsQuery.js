import Bookings from "../../../entities/clients/bookings.js";
import Client from "../../../entities/clients/clients.js";
import Therapists from "../../../entities/therapists/therapist.js";
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
            const addedSlotId = addSlot[0]._id
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

const cancelSlot = async (slotId,clientId) => {
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

export default {
    addTherapistAvailability,
    getAvailableSlots,
    postClientSlotBooking,
    getActiveSlotDetails,
    cancelSlot,

}