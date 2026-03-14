import LocationDAO from "./LocationDAO.ts";
import WarehouseDAO from "../Warehouse/WarehouseDAO.ts";
import type { ICreateLocationRequest, IUpdateLocationRequest } from "./LocationInterface.ts";
import createHttpError from "http-errors";

class LocationService {
    private locationDAO: LocationDAO;
    private warehouseDAO: WarehouseDAO;

    constructor() {
        this.locationDAO = new LocationDAO();
        this.warehouseDAO = new WarehouseDAO();
    }

    async createLocation(userId: number, data: ICreateLocationRequest) {
        // 1. Verify that the warehouse exists and belongs to the user
        const warehouse = await this.warehouseDAO.getByCodeOrName(data.warehouse_code, "");
        if (!warehouse || warehouse.user_id !== userId) {
            throw createHttpError(404, "Warehouse not found or you don't have permission to add locations to it");
        }

        // 2. Check for location code uniqueness
        const existingLocation = await this.locationDAO.getByCode(data.code);
        if (existingLocation) {
            throw createHttpError(409, "A location with this code already exists");
        }

        const newLocation = await this.locationDAO.create(data);
        if (!newLocation) {
            throw createHttpError(500, "Failed to create location");
        }
        
        return newLocation;
    }

    async getLocationsByWarehouse(warehouseCode: string, userId: number) {
        // Verify warehouse ownership first
        const warehouse = await this.warehouseDAO.getByCodeOrName(warehouseCode, "");
        if (!warehouse || warehouse.user_id !== userId) {
            throw createHttpError(404, "Warehouse not found or access denied");
        }

        return await this.locationDAO.getAllByWarehouse(warehouseCode);
    }

    async getLocationById(id: number, userId: number) {
        const location = await this.locationDAO.getById(id);
        if (!location) {
            throw createHttpError(404, "Location not found");
        }

        // Verify that the location's warehouse belongs to the user
        const warehouse = await this.warehouseDAO.getByCodeOrName(location.warehouse_code, "");
        if (!warehouse || warehouse.user_id !== userId) {
             throw createHttpError(403, "Access denied to this location");
        }

        return location;
    }

    async updateLocation(id: number, userId: number, data: IUpdateLocationRequest) {
        // Ensure the location exists and the user has rights to it
        await this.getLocationById(id, userId);

        if (data.code) {
           const existingLocation = await this.locationDAO.getByCode(data.code);
           if (existingLocation && existingLocation.id !== id) {
               throw createHttpError(409, "A location with this code already exists");
           }
        }

        const updatedLocation = await this.locationDAO.update(id, data);
        if (!updatedLocation) {
            throw createHttpError(500, "Failed to update location");
        }
        return updatedLocation;
    }

    async deleteLocation(id: number, userId: number) {
        // Ensure ownership and existence
        await this.getLocationById(id, userId);

        const deleted = await this.locationDAO.delete(id);
        if (!deleted) {
             throw createHttpError(500, "Failed to delete location");
        }
        return { message: "Location deleted successfully" };
    }
}

export default LocationService;
