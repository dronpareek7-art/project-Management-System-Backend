
import { body } from "express-validator";

export const workspaceValidationRules = [

    body("title")
        .exists()
        .withMessage("Workspace title is required")
        .bail()
        .isString()
        .withMessage("Workspace title must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Workspace title cannot be empty")
        .bail()
        .isLength({ min: 3, max: 50 })
        .withMessage("Workspace title must be between 3 and 50 characters"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .bail()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters")
];
