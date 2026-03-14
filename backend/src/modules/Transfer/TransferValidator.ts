import { body } from "express-validator";

export const createTransferValidation = [
    body("reference")
        .trim()
        .notEmpty().withMessage("Reference is required"),
    body("source_warehouse_code")
        .trim()
        .notEmpty().withMessage("Source warehouse is required"),
    body("source_location_code")
        .trim()
        .notEmpty().withMessage("Source location is required"),
    body("destination_warehouse_code")
        .trim()
        .notEmpty().withMessage("Destination warehouse is required"),
    body("destination_location_code")
        .trim()
        .notEmpty().withMessage("Destination location is required"),
    body("schedule_date")
        .trim()
        .notEmpty().withMessage("Schedule date is required")
        .isISO8601().withMessage("Invalid date format"),
    body("products")
        .isArray({ min: 1 }).withMessage("At least one product is required"),
    body("products.*.product_id")
        .isInt().withMessage("Invalid product ID"),
    body("products.*.quantity")
        .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];
