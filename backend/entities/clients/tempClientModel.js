import mongoose from "mongoose";

const tempClientSchema = mongoose.Schema({
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


const TempClient = mongoose.model('TempClient', tempClientSchema);

export default TempClient