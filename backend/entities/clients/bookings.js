import mongoose from "mongoose";

const bookingsSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapists',
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    verificationStatus: {
        type: String,
        default: 'pending'
    },
    status: {
        type: String,
        default: 'pending'
    },
    sessionStart: {
        type: String,
    },
    sessionEnd: {
        type: String,
    },
    sessionDuration: {
        type: String,
    }
}, {
    timestamps: true
})

const Bookings = mongoose.model('Bookings', bookingsSchema);

export default Bookings