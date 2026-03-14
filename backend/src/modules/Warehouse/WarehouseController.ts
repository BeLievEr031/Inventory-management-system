import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import WarehouseService from "./WarehouseService.ts";
import type { AuthRequest } from "../../middlewares/authMiddleware.ts";

class WarehouseController {
    private warehouseService: WarehouseService;

    constructor() {
        this.warehouseService = new WarehouseService();
    }

    async createWarehouse(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            // authMiddleware ensures req.user exists
            const userId = req.user.id;
            const result = await this.warehouseService.createWarehouse(userId, req.body);
            
            return res.status(201).json({ message: "Warehouse created successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllWarehouses(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user.id;
            const result = await this.warehouseService.getAllWarehouses(userId);
            
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async getWarehouseById(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const warehouseId = parseInt(req.params.id as string);
            if (isNaN(warehouseId)) {
                 throw createHttpError(400, "Invalid warehouse ID format");
            }

            const userId = req.user.id;
            const result = await this.warehouseService.getWarehouseById(warehouseId, userId);
            
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async updateWarehouse(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const warehouseId = parseInt(req.params.id as string);
            if (isNaN(warehouseId)) {
                 throw createHttpError(400, "Invalid warehouse ID format");
            }

            const userId = req.user.id;
            const result = await this.warehouseService.updateWarehouse(warehouseId, userId, req.body);
            
            return res.status(200).json({ message: "Warehouse updated successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async deleteWarehouse(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const warehouseId = parseInt(req.params.id as string);
            if (isNaN(warehouseId)) {
                 throw createHttpError(400, "Invalid warehouse ID format");
            }

            const userId = req.user.id;
            const result = await this.warehouseService.deleteWarehouse(warehouseId, userId);
            
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default WarehouseController;
