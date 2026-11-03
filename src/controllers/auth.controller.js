import userModel from "../models/auth.model.js";

export async function registerUser(req, res) {
    try {




        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const newUser = await userModel.create({
            username,
            email,
            password
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser
        })
    }
    catch (error) {
        console.error("Internal Server Error:", error)
    }
}