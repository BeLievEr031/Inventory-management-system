import { body } from "express-validator";

export const createLocationValidation = [
    body("warehouse_code")
        .trim()
        .notEmpty().withMessage("Warehouse code is required")
        .isLength({ min: 3, max: 20 }).withMessage("Warehouse code must be between 3 and 20 characters"),
    body("name")
        .trim()
        .notEmpty().withMessage("Location name is required")
        .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters"),
    body("code")
        .trim()
        .notEmpty().withMessage("Location code is required")
        .matches(/^[A-Za-z0-9_-]+$/).withMessage("Location code can only contain letters, numbers, hyphens, and underscores")
        .isLength({ min: 3, max: 20 }).withMessage("Code must be between 3 and 20 characters"),
];

export const updateLocationValidation = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters"),
    body("code")
        .optional()
        .trim()
        .matches(/^[A-Za-z0-9_-]+$/).withMessage("Location code can only contain letters, numbers, hyphens, and underscores")
        .isLength({ min: 3, max: 20 }).withMessage("Code must be between 3 and 20 characters"),
];
