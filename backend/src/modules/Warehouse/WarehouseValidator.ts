import { body } from "express-validator";

export const createWarehouseValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Warehouse name is required")
        .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters"),
    body("code")
        .trim()
        .notEmpty().withMessage("Warehouse code is required")
        .matches(/^[A-Za-z0-9_-]+$/).withMessage("Warehouse code can only contain letters, numbers, hyphens, and underscores")
        .isLength({ min: 3, max: 20 }).withMessage("Code must be between 3 and 20 characters"),
];

export const updateWarehouseValidation = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters"),
    body("code")
        .optional()
        .trim()
        .matches(/^[A-Za-z0-9_-]+$/).withMessage("Warehouse code can only contain letters, numbers, hyphens, and underscores")
        .isLength({ min: 3, max: 20 }).withMessage("Code must be between 3 and 20 characters"),
];
