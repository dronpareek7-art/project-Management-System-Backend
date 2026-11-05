import mongoose from "mongoose";

const workspaceMemberSchema = new mongoose.Schema({
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workspace",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member"
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

workspaceMemberSchema.index({ workspace: 1, user: 1 }, { unique: true });

const WorkSpaceMemberModel = mongoose.model("WorkSpaceMember", workspaceMemberSchema);

export default WorkSpaceMemberModel;