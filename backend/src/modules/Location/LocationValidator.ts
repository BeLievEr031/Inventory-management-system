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
        .isAlphanumeric().withMessage("Location code must be alphanumeric")
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
        .isAlphanumeric().withMessage("Location code must be alphanumeric")
        .isLength({ min: 3, max: 20 }).withMessage("Code must be between 3 and 20 characters"),
];
