import mongoose from "mongoose";
import WorkSpaceModel from "../models/workspace.model.js";
import WorkSpaceMemberModel from "../models/workspaceMember.model.js";

export async function createWorkspace(req, res) {
    try {
        const { title, description } = req.body;
        const newWorkspace = await WorkSpaceModel.create({
            title, description, owner: req.user.id
        });

        await WorkSpaceMemberModel.create({
            workspaceId: newWorkspace._id,
            userId: req.user.id,
            role: "admin"

        })
        return res.status(201).json({
            success: true,
            message: "New workspace was created successfully",
            newWorkspace
        })
    }
    catch (error) {
        console.error("Create workspace error:", error)

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Duplicate workspace slug"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}


export async function getAllWorkspaces(req, res) {
    try {

        const userId = req.user.id;

        // Find all workspaces where logged-in user is a member
        const memberships = await WorkSpaceMemberModel.find({
            userId
        })
            .populate({
                path: "workspaceId",
                select: "title description owner slug createdAt updatedAt"
            })
            .sort({ joinedAt: -1 });

        // Prepare workspace response
        const workspaces = memberships
            .filter(member => member.workspaceId !== null)
            .map(member => ({
                ...member.workspaceId.toObject(),
                role: member.role,
                joinedAt: member.joinedAt
            }));

        return res.status(200).json({
            success: true,
            message: "Workspaces fetched successfully",
            totalWorkspaces: workspaces.length,
            workspaces
        });

    } catch (error) {

        console.error("Get workspaces error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export async function getWorkspaceDetails(req, res) {
    
    try {
        const { workspaceId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Workspace Id"
            })
        };

        const workspace = await WorkSpaceModel.find(workspaceId);

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found"
            })
        }
        const membership = await WorkSpaceMemberModel.findOne({
            workspaceId,
            userId: req.user.id
        });
        if (!membership) {
            return res.status(403).json({
                success: false,
                message: "you are not a longer user of this workspace"
            })
        };

        return res.status(200).json({
            success: true,
            message: "Workspace details fetched successfully",
            workspace: {
                ...workspace.toObject(),
                role: membership.role,
                joinedAt: membership.joinedAt
            }
        });
    }
    catch (error) {
        console.error("Workspace details error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}