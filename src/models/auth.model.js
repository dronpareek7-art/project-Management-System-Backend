import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true
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
        trim: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["developer", "team_lead", "admin"],
        default: "developer"
    }
}, { timestamps: true });

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10)

});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)

}
const userModel = mongoose.model("user", userSchema);

export default userModel;