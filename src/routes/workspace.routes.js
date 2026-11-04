
import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { validateFields } from "../middlewares/auth.validation";
import { workspaceValidationRules } from "../middlewares/workspace.validation";
const workspaceRouter = express.Router();

workspaceRouter.post("/workspaces", verifyToken, workspaceValidationRules, validateFields)

export default workspaceRouter;