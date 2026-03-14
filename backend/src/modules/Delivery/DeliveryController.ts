import type { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import DeliveryService from "./DeliveryService.ts";
import type { AuthRequest } from "../../middlewares/authMiddleware.ts";

class DeliveryController {
    private deliveryService: DeliveryService;

    constructor() {
        this.deliveryService = new DeliveryService();
    }

    async createDelivery(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const userId = req.user.id;
            const result = await this.deliveryService.createDelivery(userId, req.body);
            return res.status(201).json({ message: "Delivery order created successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllDeliveries(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user.id;
            const result = await this.deliveryService.getAllDeliveries(userId);
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async getDeliveryById(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) throw createHttpError(400, "Invalid ID format");

            const userId = req.user.id;
            const result = await this.deliveryService.getDeliveryById(id, userId);
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async validateDelivery(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) throw createHttpError(400, "Invalid ID format");

            const userId = req.user.id;
            const result = await this.deliveryService.validateDelivery(id, userId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default DeliveryController;
