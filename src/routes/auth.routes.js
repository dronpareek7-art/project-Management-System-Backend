import express from "express"
import { registerUser } from "../controllers/auth.controller.js";
import { registerValidationRules, validateFields } from "../middlewares/auth.validation.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidationRules, validateFields, registerUser);

export default authRouter;