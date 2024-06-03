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
    age: {
        type: String
    },
    sessionType: {
        type: String,
    },
    questionnaire: {
        type: Array,
    },
    stripeCustomerId: {
        type: String
    },
    stripeSubscriptionId: {
        type: String
    },
    stripePriceId: {
        type: String
    },
    stripeCurrentPeriodEnd: {
        type: Date
    },
    isConnected: {
        type: String,
        default: 'false'
    },
    isSubscribed: {
        type: Boolean,
        default: false
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