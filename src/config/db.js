import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database was connected successfully");
    }
    catch (error) {
        console.error("Error is appear:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}