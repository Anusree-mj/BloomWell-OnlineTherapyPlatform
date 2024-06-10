import mongoose from "mongoose";

const therapistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
    },
    license: {
        licenseNo: {
            type: String,
            required: true
        },
        licenseProof: {
            type: String,
        },
        country: {
            type: String,
        },
        expirationDate: {
            type: Date,
        }
    },
    expertise: {
        type: Array,
    },
    experience: {
        type: String,
    },
    gender: {
        type: String
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationStatus: {
        type: String,
        default: 'pending'
    },
    reasonForRejection: {
        type: String,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const Therapists = mongoose.model('Therapists', therapistSchema);

export default Therapists