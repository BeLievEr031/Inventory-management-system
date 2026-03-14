import { body } from "express-validator";

export const createReceiptValidation = [
    body("supplier_name").isString().notEmpty().withMessage("Supplier name is required"),
    body("schedule_date").isISO8601().withMessage("Valid schedule date is required"),
    body("products").isArray({ min: 1 }).withMessage("At least one product is required"),
    body("products.*.product_id").isInt().withMessage("Product ID must be an integer"),
    body("products.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("products.*.warehouse_code").isString().notEmpty().withMessage("Warehouse code is required"),
    body("products.*.location_code").isString().notEmpty().withMessage("Location code is required"),
];
