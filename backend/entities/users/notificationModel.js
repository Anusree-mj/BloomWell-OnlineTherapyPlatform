import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['Client', 'Therapists'],
    },
    head: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    }

}, {
    timestamps: true
})

const Notifications = mongoose.model('Notifications', notificationSchema);

export default Notifications