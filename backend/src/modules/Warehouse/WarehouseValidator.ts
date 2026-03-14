import { body } from "express-validator";

export const createWarehouseValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Warehouse name is required")
        .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters"),
    body("code")
        .trim()
        .notEmpty().withMessage("Warehouse code is required")
        .isAlphanumeric().withMessage("Warehouse code must be alphanumeric")
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
        .isAlphanumeric().withMessage("Warehouse code must be alphanumeric")
        .isLength({ min: 3, max: 20 }).withMessage("Code must be between 3 and 20 characters"),
];
