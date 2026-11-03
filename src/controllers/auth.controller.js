import userModel from "../models/auth.model.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
    try {
        const { username, email, password, role = "developer" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            })
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (isUserAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: "Username or email is already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role

        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        })
    }
    catch (error) {
        console.error("Register Error:", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}