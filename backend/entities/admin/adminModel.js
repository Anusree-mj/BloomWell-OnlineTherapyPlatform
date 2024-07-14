import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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
    totalEarnings: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

const Admin = mongoose.model('admins', adminSchema);

export default Admin