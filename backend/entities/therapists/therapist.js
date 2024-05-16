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
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        expirationDate: {
            type: Date,
        }
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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