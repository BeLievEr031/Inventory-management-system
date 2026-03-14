import { body } from "express-validator";

export const registerValidation = [
    body("login_id")
        .trim()
        .notEmpty().withMessage("Login ID is required")
        .isLength({ min: 6 }).withMessage("Login ID must be at least 6 characters")
        .isLength({ max: 12 }).withMessage("Login ID must be at least 12 characters"),
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/)
        .withMessage(
            "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
        ),
];

export const loginValidation = [
    body("login_id")
        .trim()
        .notEmpty().withMessage("Login ID is required"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
];

export const forgetPasswordValidation = [
    body("login_id")
        .optional()
        .trim(),
    body("email")
        .optional()
        .trim()
        .isEmail().withMessage("Must be a valid email address"),
    body("new_password")
        .trim()
        .notEmpty().withMessage("New Password is required")
        .isLength({ min: 6 }).withMessage("New Password must be at least 6 characters")
];
