
import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { validateFields } from "../middlewares/auth.validation.js";
import { workspaceValidationRules } from "../middlewares/workspace.validation.js";
import { createWorkspace } from "../controllers/workspace.controller.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/workspaces", verifyToken, workspaceValidationRules, validateFields, createWorkspace)

export default workspaceRouter;