import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import LocationService from "./LocationService.ts";
import type { AuthRequest } from "../../middlewares/authMiddleware.ts";

class LocationController {
    private locationService: LocationService;

    constructor() {
        this.locationService = new LocationService();
    }

    async createLocation(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const userId = req.user.id;
            const result = await this.locationService.createLocation(userId, req.body);
            
            return res.status(201).json({ message: "Location created successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async getLocationsByWarehouse(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const warehouseCode = req.params.warehouseCode as string;
            if (!warehouseCode) {
                 throw createHttpError(400, "Warehouse code is required as a parameter");
            }

            const userId = req.user.id;
            const result = await this.locationService.getLocationsByWarehouse(warehouseCode, userId);
            
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async getLocationById(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const locationId = parseInt(req.params.id as string);
            if (isNaN(locationId)) {
                 throw createHttpError(400, "Invalid location ID format");
            }
            
            const userId = req.user.id;
            const result = await this.locationService.getLocationById(locationId, userId);
            
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async updateLocation(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const locationId = parseInt(req.params.id as string);
            if (isNaN(locationId)) {
                 throw createHttpError(400, "Invalid location ID format");
            }

            const userId = req.user.id;
            const result = await this.locationService.updateLocation(locationId, userId, req.body);
            
            return res.status(200).json({ message: "Location updated successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async deleteLocation(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const locationId = parseInt(req.params.id as string);
            if (isNaN(locationId)) {
                 throw createHttpError(400, "Invalid location ID format");
            }

            const userId = req.user.id;
            const result = await this.locationService.deleteLocation(locationId, userId);
            
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default LocationController;
