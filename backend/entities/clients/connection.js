import mongoose from "mongoose";

const connectionsSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapists',
    },
    status: {
        type: String,
        default: 'pending'
    },
    adminVerify: {
        type: String,
        default: 'pending'
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Connections = mongoose.model('Connections', connectionsSchema);

export default Connections