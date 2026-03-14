import { eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { locations } from "../../db/schemas/locationSchema.ts";
import type { ICreateLocationRequest, IUpdateLocationRequest } from "./LocationInterface.ts";

class LocationDAO {
    async create(data: ICreateLocationRequest) {
        const [newLocation] = await db.insert(locations).values({
            warehouse_code: data.warehouse_code,
            name: data.name,
            code: data.code,
        }).returning();
        return newLocation;
    }

    async getByCode(code: string) {
        const result = await db.select().from(locations).where(
            eq(locations.code, code)
        ).limit(1);
        return result[0] || null;
    }

    async getAllByWarehouse(warehouseCode: string) {
        return await db.select().from(locations).where(eq(locations.warehouse_code, warehouseCode));
    }

    async getById(id: number) {
        const result = await db.select().from(locations).where(
            eq(locations.id, id)
        ).limit(1);
        return result[0] || null;
    }

    async update(id: number, data: IUpdateLocationRequest) {
        const updateData: any = { updated_at: new Date() };
        if (data.name) updateData.name = data.name;
        if (data.code) updateData.code = data.code;

        const [updatedLocation] = await db.update(locations)
            .set(updateData)
            .where(eq(locations.id, id))
            .returning();
            
        return updatedLocation;
    }

    async delete(id: number) {
        const [deletedLocation] = await db.delete(locations)
            .where(eq(locations.id, id))
            .returning({ id: locations.id });
            
        return deletedLocation;
    }
}

export default LocationDAO;
