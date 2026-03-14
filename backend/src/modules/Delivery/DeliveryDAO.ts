import { eq, and } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { deliveries, deliveryProduct } from "../../db/schemas/deliverySchema.ts";
import { productQuantity } from "../../db/schemas/productSchema.ts";
import type { ICreateDeliveryRequest, IUpdateDeliveryRequest } from "./DeliveryInterface.ts";

class DeliveryDAO {
    async create(userId: number, data: ICreateDeliveryRequest) {
        return await db.transaction(async (tx) => {
            const totalQuantity = data.products.reduce((sum, p) => sum + p.quantity, 0);

            const [newDelivery] = await tx.insert(deliveries).values({
                reference: data.reference,
                delivery_address: data.delivery_address,
                contact_name: data.contact_name,
                schedule_date: data.schedule_date,
                total_quantity: totalQuantity,
                operation_type: data.operation_type || "Outgoing",
                responsible_user: userId,
                status: "Draft",
            }).returning();

            if (!newDelivery) throw new Error("Failed to create delivery");

            for (const product of data.products) {
                await tx.insert(deliveryProduct).values({
                    delivery_id: newDelivery.id,
                    product_id: product.product_id,
                    quantity: product.quantity,
                    warehouse_code: product.warehouse_code,
                    location_code: product.location_code,
                });
            }

            return newDelivery;
        });
    }

    async getAll(userId: number) {
        return await db.select().from(deliveries).where(eq(deliveries.responsible_user, userId));
    }

    async getById(id: number, userId: number) {
        const [delivery] = await db.select().from(deliveries).where(and(eq(deliveries.id, id), eq(deliveries.responsible_user, userId)));
        if (!delivery) return null;

        const products = await db.select().from(deliveryProduct).where(eq(deliveryProduct.delivery_id, id));
        return { ...delivery, products };
    }

    async updateStatus(id: number, status: "Draft" | "Waiting" | "Ready" | "Done") {
        return await db.transaction(async (tx) => {
            const [updated] = await tx.update(deliveries)
                .set({ status, updated_at: new Date() })
                .where(eq(deliveries.id, id))
                .returning();

            if (status === "Done") {
                const products = await tx.select().from(deliveryProduct).where(eq(deliveryProduct.delivery_id, id));
                for (const p of products) {
                    // Decrease stock
                    await tx.execute(`
                        UPDATE product_quantity 
                        SET quantity = quantity - ${p.quantity}, updated_at = NOW()
                        WHERE product_id = ${p.product_id}
                    `);
                }
            }

            return updated;
        });
    }
}

export default DeliveryDAO;
