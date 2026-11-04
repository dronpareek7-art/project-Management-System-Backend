import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Workspace name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ""
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },

}, { timestamps: true });

workspaceSchema.pre("save", async function () {

    if (!this.isModified("title")) {
        return;
    }

    const baseSlug = this.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    let slug = baseSlug;
    let count = 1;

    while (
        await mongoose.models.workspace.exists({ slug, _id: { $ne: this._id } })
    ) {
        slug = `${baseSlug}-${count}`;
        count++;
    }
    this.slug = slug;
});

const WorkSpaceModel = mongoose.model("workspace", workspaceSchema);

export default WorkSpaceModel;