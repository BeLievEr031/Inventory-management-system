import WarehouseDAO from "./WarehouseDAO.ts";
import type { ICreateWarehouseRequest, IUpdateWarehouseRequest } from "./WarehouseInterface.ts";
import createHttpError from "http-errors";

class WarehouseService {
    private warehouseDAO: WarehouseDAO;

    constructor() {
        this.warehouseDAO = new WarehouseDAO();
    }

    async createWarehouse(userId: number, data: ICreateWarehouseRequest) {
        // Check for warehouse with same unique code or name
        const existingWarehouse = await this.warehouseDAO.getByCodeOrName(data.code, data.name);
        if (existingWarehouse) {
            if (existingWarehouse.code === data.code) {
                throw createHttpError(409, "A warehouse with this code already exists");
            }
            if (existingWarehouse.name === data.name) {
                throw createHttpError(409, "A warehouse with this name already exists");
            }
        }

        const newWarehouse = await this.warehouseDAO.create(userId, data);
        if (!newWarehouse) {
            throw createHttpError(500, "Failed to create warehouse");
        }
        
        return newWarehouse;
    }

    async getAllWarehouses(userId: number) {
        return await this.warehouseDAO.getAll(userId);
    }

    async getWarehouseById(id: number, userId: number) {
        const warehouse = await this.warehouseDAO.getById(id, userId);
        if (!warehouse) {
            throw createHttpError(404, "Warehouse not found or you don't have permission to view it");
        }
        return warehouse;
    }

    async updateWarehouse(id: number, userId: number, data: IUpdateWarehouseRequest) {
        // Ensure the warehouse exists and belongs to the user first
        await this.getWarehouseById(id, userId);

        // If they are updating code or name, ensure there's no collision
        if (data.code || data.name) {
            const existingWarehouse = await this.warehouseDAO.getByCodeOrName(data.code || "", data.name || "");
            
            if (existingWarehouse && existingWarehouse.id !== id) {
                if (existingWarehouse.code === data.code) {
                     throw createHttpError(409, "A warehouse with this code already exists");
                }
                if (existingWarehouse.name === data.name) {
                     throw createHttpError(409, "A warehouse with this name already exists");
                }
            }
        }

        const updatedWarehouse = await this.warehouseDAO.update(id, userId, data);
        if (!updatedWarehouse) {
            throw createHttpError(500, "Failed to update warehouse");
        }
        return updatedWarehouse;
    }

    async deleteWarehouse(id: number, userId: number) {
        // Ensure existence and ownership
        await this.getWarehouseById(id, userId);

        // TODO: In the future, check if locations rely on this warehouse before deleting.
        const deleted = await this.warehouseDAO.delete(id);
        if (!deleted) {
             throw createHttpError(500, "Failed to delete warehouse");
        }
        return { message: "Warehouse deleted successfully" };
    }
}

export default WarehouseService;
