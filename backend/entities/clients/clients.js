import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    sessionType: {
        type: String,
        required: true
    },
    questionnaire: {
        type: Array,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const Client = mongoose.model('Client', clientSchema);

export default Client