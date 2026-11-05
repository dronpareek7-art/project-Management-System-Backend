
import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { validateFields } from "../middlewares/auth.validation.js";
import { workspaceValidationRules } from "../middlewares/workspace.validation.js";
import { createWorkspace, getAllWorkspaces, getWorkspaceDetails, updateWorkspace } from "../controllers/workspace.controller.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/workspaces", verifyToken, workspaceValidationRules, validateFields, createWorkspace)
workspaceRouter.get("/workspaces", verifyToken, getAllWorkspaces)
workspaceRouter.get("/workspaces/:workspaceId", verifyToken, getWorkspaceDetails)
workspaceRouter.post("/workspaces/:workspaceId", verifyToken, updateWorkspace)

export default workspaceRouter;