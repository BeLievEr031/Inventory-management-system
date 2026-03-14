import { body } from "express-validator";

export const createProductValidation = [
    body("name")
        .trim()
        .notEmpty().withMessage("Product name is required")
        .isLength({ min: 2, max: 200 }).withMessage("Name must be between 2 and 200 characters"),
    body("sku")
        .trim()
        .notEmpty().withMessage("SKU is required")
        .isUppercase().withMessage("SKU should be uppercase")
        .isLength({ min: 3, max: 50 }).withMessage("SKU must be between 3 and 50 characters"),
    body("category")
        .trim()
        .notEmpty().withMessage("Category is required"),
    body("warehouse_code")
        .trim()
        .notEmpty().withMessage("Warehouse code is required"),
    body("location_code")
        .trim()
        .notEmpty().withMessage("Location code is required"),
    body("quantity")
        .optional()
        .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
];

export const updateProductValidation = [
    body("name").optional().trim().isLength({ min: 2, max: 200 }),
    body("sku").optional().trim().isUppercase().isLength({ min: 3, max: 50 }),
    body("category").optional().trim(),
    body("warehouse_code").optional().trim(),
    body("location_code").optional().trim(),
    body("quantity").optional().isInt({ min: 0 }),
];
