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
            await Client.findByIdAndUpdate(clientId, { isActiveSlots: true });
            console.log('added slotss', addSlot)
            return { status: 'ok' }
        } else {
            return { status: 'nok' }
        }
    } catch (err) {
        console.log(err)
    }
}
export default {
    addTherapistAvailability,
    getAvailableSlots,
    postClientSlotBooking,

}