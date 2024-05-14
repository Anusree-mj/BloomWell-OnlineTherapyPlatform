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
    },
    questionnaire: {
        type: Array,
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