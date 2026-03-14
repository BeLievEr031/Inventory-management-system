import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.ts";
import warehouseRoutes from "./routes/warehouseRoutes.ts";
import locationRoutes from "./routes/locationRoutes.ts";


dotenv.config();

const app = express()
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const BASE_API = "/api/v1";
app.use(BASE_API, userRouter);
app.use(BASE_API, warehouseRoutes);
app.use(BASE_API, locationRoutes);

// Global Error Handler
import { errorHandler } from "./middlewares/errorHandler.ts";
app.use(errorHandler);

// Swagger Documentation
import { setupSwagger } from "./config/swagger.ts";
setupSwagger(app);

export default app;