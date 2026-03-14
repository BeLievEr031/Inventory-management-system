import { Router } from "express";
import UserController from "../modules/User/UserController.ts";
import { registerValidation, loginValidation, forgetPasswordValidation } from "../modules/User/UserValidator.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const userRouter = Router();
const userController = new UserController();

// Registration route
userRouter.post("/user/register", registerValidation, userController.register);

// Login route
userRouter.post("/user/login", loginValidation, userController.login);

// Forget password route
userRouter.post("/user/forget-password", forgetPasswordValidation, userController.forgetPassword);

// Refresh token route
userRouter.post("/user/refresh-token", authMiddleware, userController.refreshToken);

export default userRouter;
