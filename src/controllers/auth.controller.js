import userModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
    try {
        const { username, email, password, role = "developer" } = req.body;
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

        const newUser = await userModel.create({
            username,
            email,
            password,
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
        console.error("Register Error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Username or email already exists"
            })
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not registered"
            })
        }
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1D" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User Login SuccessFull",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}