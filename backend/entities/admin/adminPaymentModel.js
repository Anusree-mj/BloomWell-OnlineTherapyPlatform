import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapists',
    },
    totalClients: {
        type: Number,
    },
    totalLiveSession: {
        type: Number
    },
    averageLiveSessionHrs: {
        type: String
    },
    totalAmount: {
        type: Number,
    },
    paymentStatus: {
        type: String,
        default: 'Pending'
    },

}, {
    timestamps: true
})

const Payments = mongoose.model('Payments', paymentSchema);

export default Payments