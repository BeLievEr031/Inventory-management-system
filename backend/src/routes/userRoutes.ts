import { Router } from "express";
import UserController from "../modules/User/UserController.ts";
import { registerValidation, loginValidation, forgetPasswordValidation } from "../modules/User/UserValidator.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const userRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login_id
 *               - email
 *               - password
 *             properties:
 *               login_id:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 */
userRouter.post("/user/register", registerValidation, userController.register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user and receive tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login_id:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns user data AND sets HttpOnly cookies (token & refresh_token)
 *       400:
 *         description: Missing credentials
 *       401:
 *         description: Invalid credentials
 */
userRouter.post("/user/login", loginValidation, userController.login);

/**
 * @swagger
 * /user/forget-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login_id:
 *                 type: string
 *               email:
 *                 type: string
 *               new_password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 */
userRouter.post("/user/forget-password", forgetPasswordValidation, userController.forgetPassword);

/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     summary: Generate a new access token
 *     description: Reads the `refresh_token` cookie and sends a new `token` cookie.
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Refresh token missing or invalid
 */
userRouter.post("/user/refresh-token", authMiddleware, userController.refreshToken);

export default userRouter;
