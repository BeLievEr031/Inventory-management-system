import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.ts";


dotenv.config();

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const BASE_API = "/api/v1";
app.use(BASE_API, userRouter);

// Global Error Handler
import { errorHandler } from "./middlewares/errorHandler.ts";
app.use(errorHandler);

export default app;