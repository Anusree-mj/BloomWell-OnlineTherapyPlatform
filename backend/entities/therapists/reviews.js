import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapists',
    },
    rating: {
        type: Number,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

const Reviews = mongoose.model('Reviews', reviewSchema);

export default Reviews