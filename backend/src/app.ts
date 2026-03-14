import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.ts";
import warehouseRoutes from "./routes/warehouseRoutes.ts";
import locationRoutes from "./routes/locationRoutes.ts";
import productRoutes from "./routes/productRoutes.ts";
import receiptRouter from "./routes/receiptRoutes.ts";
import deliveryRouter from "./routes/deliveryRoutes.ts";


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
app.use(BASE_API, productRoutes);
app.use(BASE_API, receiptRouter);
app.use(BASE_API, deliveryRouter);

// Global Error Handler
import { errorHandler } from "./middlewares/errorHandler.ts";
app.use(errorHandler);

// Swagger Documentation
import { setupSwagger } from "./config/swagger.ts";
setupSwagger(app);

export default app;