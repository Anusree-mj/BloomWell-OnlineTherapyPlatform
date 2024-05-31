import mongoose from "mongoose";

const tempUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})


const TempUser = mongoose.model('TempUser', tempUserSchema);

export default TempUser