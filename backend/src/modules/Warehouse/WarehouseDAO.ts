import { eq, or } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { warehouses } from "../../db/schemas/warehouseSchema.ts";
import type { ICreateWarehouseRequest, IUpdateWarehouseRequest } from "./WarehouseInterface.ts";

class WarehouseDAO {
    async create(userId: number, data: ICreateWarehouseRequest) {
        const [newWarehouse] = await db.insert(warehouses).values({
            user_id: userId,
            name: data.name,
            code: data.code,
        }).returning();
        return newWarehouse;
    }

    async getByCodeOrName(code: string, name: string) {
        const result = await db.select().from(warehouses).where(
            or(
                eq(warehouses.code, code),
                eq(warehouses.name, name)
            )
        ).limit(1);
        return result[0] || null;
    }

    async getAll(userId: number) {
        return await db.select().from(warehouses).where(eq(warehouses.user_id, userId));
    }

    async getById(id: number, userId: number) {
        const result = await db.select().from(warehouses).where(
            eq(warehouses.id, id)
        ).limit(1);
        
        const warehouse = result[0];
        // Ensure user owns this warehouse
        if (warehouse && warehouse.user_id === userId) {
            return warehouse;
        }
        return null; // Not found or not owned by user
    }

    async update(id: number, userId: number, data: IUpdateWarehouseRequest) {
        const updateData: any = { updated_at: new Date() };
        if (data.name) updateData.name = data.name;
        if (data.code) updateData.code = data.code;

        const [updatedWarehouse] = await db.update(warehouses)
            .set(updateData)
            .where(
                eq(warehouses.id, id)
                // In Drizzle, complex ANDs can sometimes be tricky unless using `and()`.
                // However, we verify ownership in the service layer using `getById` before calling update.
            )
            .returning();
            
        return updatedWarehouse;
    }

    async delete(id: number) {
        const [deletedWarehouse] = await db.delete(warehouses)
            .where(eq(warehouses.id, id))
            .returning({ id: warehouses.id });
            
        return deletedWarehouse;
    }
}

export default WarehouseDAO;
