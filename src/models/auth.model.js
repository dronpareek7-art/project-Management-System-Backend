import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["developer", "team_lead", "admin"],
        default: "developer"
    }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;