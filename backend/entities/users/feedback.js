import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['Client', 'Therapists'],
    },
    ratings: {
        type: Number,
    },
    feedback: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback