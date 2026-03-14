import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserDAO from "./UserDAO.ts";
import type { IRegisterRequest, ILoginRequest, IForgetPasswordRequest } from "./UserInterface.ts";
import createHttpError from "http-errors";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key_here";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_super_secret_refresh_key_here";

class UserService {
    private userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO();
    }

    async register(data: IRegisterRequest) {
        const existingEmail = await this.userDAO.getUserByEmailOrLoginId(data.email);
        if (existingEmail && existingEmail.email === data.email) {
            throw createHttpError(409, "User with this email already exists");
        }

        const existingLoginId = await this.userDAO.getUserByEmailOrLoginId(data.login_id);
        if (existingLoginId && existingLoginId.login_id === data.login_id) {
            throw createHttpError(409, "User with this login_id already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password as string, 10);
        const newUser = await this.userDAO.createUser({
            ...data,
            password: hashedPassword
        });

        if (!newUser) {
            throw createHttpError(500, "Failed to create user");
        }

        return { id: newUser.id, email: newUser.email, login_id: newUser.login_id };
    }

    async login(data: ILoginRequest) {
        const identifier = data.email || data.login_id;
        if (!identifier) throw createHttpError(400, "Email or Login ID is required");

        const user = await this.userDAO.getUserByEmailOrLoginId(identifier);
        if (!user) throw createHttpError(401, "Invalid credentials");

        const isValid = await bcrypt.compare(data.password as string, user.password);
        if (!isValid) throw createHttpError(401, "Invalid credentials");

        const token = jwt.sign({ id: user.id, login_id: user.login_id }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id, login_id: user.login_id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

        return { token, refreshToken, user: { id: user.id, email: user.email, login_id: user.login_id } };
    }

    async refreshToken(token: string) {
        if (!token) throw createHttpError(401, "Refresh token is required");

        try {
            const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as any;
            const user = await this.userDAO.getUserByEmailOrLoginId(decoded.login_id);
            if (!user) throw createHttpError(404, "User not found");

            const newAccessToken = jwt.sign({ id: user.id, login_id: user.login_id }, JWT_SECRET, { expiresIn: '15m' });
            return { access_token: newAccessToken };
        } catch (error) {
            throw createHttpError(401, "Invalid or expired refresh token");
        }
    }

    async forgetPassword(data: IForgetPasswordRequest) {
        const identifier = data.email || data.login_id;
        if (!identifier) throw createHttpError(400, "Email or Login ID is required");

        const user = await this.userDAO.getUserByEmailOrLoginId(identifier);
        if (!user) throw createHttpError(404, "User not found");

        const hashedPassword = await bcrypt.hash(data.new_password as string, 10);
        await this.userDAO.updatePassword(user.id, hashedPassword);

        return { message: "Password updated successfully" };
    }
}

export default UserService;
