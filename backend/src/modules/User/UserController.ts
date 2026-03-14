import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import UserService from "./UserService.ts";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const result = await this.userService.register(req.body);
            return res.status(201).json({ message: "User registered successfully", data: result });
        } catch (error: any) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const result = await this.userService.login(req.body);
            
            // Set the token as a cookie
            res.cookie("token", result.token, {
                httpOnly: true, // Prevents client-side JS from reading the cookie
                secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
                sameSite: "strict", // Protects against CSRF attacks
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            res.cookie("refresh_token", result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            // Return user information with the token for fallback storage
            return res.status(200).json({ 
                message: "Login successful", 
                data: {
                    user: result.user,
                    token: result.token
                }
            });
        } catch (error: any) {
            next(createHttpError(401, error.message)); // Wrap generic Error into a 401 HttpError
        }
    }

    async forgetPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                 throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const result = await this.userService.forgetPassword(req.body);
            return res.status(200).json(result);
        } catch (error: any) {
             next(createHttpError(400, error.message));
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const refreshToken = req.cookies?.refresh_token;
            if (!refreshToken) {
                throw createHttpError(401, "Refresh token is missing");
            }

            const result = await this.userService.refreshToken(refreshToken);
            
            res.cookie("token", result.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            return res.status(200).json({ message: "Token refreshed successfully" });
        } catch (error: any) {
             next(createHttpError(401, error.message));
        }
    }
}

export default UserController;