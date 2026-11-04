import express from "express"
import { getMe, loginUser, registerUser } from "../controllers/auth.controller.js";
import { registerValidationRules, validateFields } from "../middlewares/auth.validation.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidationRules, validateFields, registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", verifyToken, getMe);

export default authRouter;