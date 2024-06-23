import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    senderType: {
        type: String,
        required: true,
        enum: ['Client', 'Therapists'],
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    recieverType: {
        type: String,
        required: true,
        enum: ['Client', 'Therapists'],
    },
    message: {
        type: String,
        reruired: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Chats = mongoose.model('Chats', chatSchema);

export default Chats