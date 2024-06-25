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
    connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connections',
    },
    sessionType: {
        type: String,
    },
    questionnaire: {
        type: Array,
    },
    subscription: {
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
            type: String
        },
        stripeCurrentPeriodStart: {
            type: String
        },
        stripeTrialEnd: {
            type: String
        },
        amount: {
            type: Number
        },
        status: {
            type: String,
            default: 'active'
        }
    },
    isAnUser: {
        type: Boolean,
        default: false
    },
    isConnected: {
        type: Boolean,
        default: false
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isActiveSlots: {
        type: Boolean,
        default: false,
    },
    activeSlotId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookings',
    },
}, {
    timestamps: true
})

const Client = mongoose.model('Client', clientSchema);

export default Client