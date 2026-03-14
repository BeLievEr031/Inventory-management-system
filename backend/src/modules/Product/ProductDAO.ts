import { eq, and } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { productInform, productQuantity } from "../../db/schemas/productSchema.ts";
import type { ICreateProductRequest, IUpdateProductRequest } from "./ProductInterface.ts";

class ProductDAO {
    async create(userId: number, data: ICreateProductRequest) {
        return await db.transaction(async (tx) => {
            const [newProduct] = await tx.insert(productInform).values({
                name: data.name,
                sku: data.sku,
                category: data.category,
                warehouse_code: data.warehouse_code,
                location_code: data.location_code,
                user_id: userId,
            }).returning();

            if (!newProduct) {
                throw new Error("Product creation failed");
            }

            await tx.insert(productQuantity).values({
                product_id: newProduct.id,
                quantity: data.quantity || 0,
            });

            return newProduct;
        });
    }

    async getBySKU(sku: string) {
        const result = await db.select().from(productInform).where(eq(productInform.sku, sku)).limit(1);
        return result[0] || null;
    }

    async getAll(userId: number) {
        return await db.select({
            id: productInform.id,
            name: productInform.name,
            sku: productInform.sku,
            category: productInform.category,
            warehouse_code: productInform.warehouse_code,
            location_code: productInform.location_code,
            quantity: productQuantity.quantity,
            created_at: productInform.created_at,
            updated_at: productInform.updated_at,
        })
        .from(productInform)
        .leftJoin(productQuantity, eq(productInform.id, productQuantity.product_id))
        .where(eq(productInform.user_id, userId));
    }

    async getById(id: number, userId: number) {
        const result = await db.select({
            id: productInform.id,
            name: productInform.name,
            sku: productInform.sku,
            category: productInform.category,
            warehouse_code: productInform.warehouse_code,
            location_code: productInform.location_code,
            user_id: productInform.user_id,
            quantity: productQuantity.quantity,
            created_at: productInform.created_at,
            updated_at: productInform.updated_at,
        })
        .from(productInform)
        .leftJoin(productQuantity, eq(productInform.id, productQuantity.product_id))
        .where(and(eq(productInform.id, id), eq(productInform.user_id, userId)))
        .limit(1);

        return result[0] || null;
    }

    async update(id: number, data: IUpdateProductRequest) {
        return await db.transaction(async (tx) => {
            const updateFields: any = { updated_at: new Date() };
            if (data.name) updateFields.name = data.name;
            if (data.sku) updateFields.sku = data.sku;
            if (data.category) updateFields.category = data.category;
            if (data.warehouse_code) updateFields.warehouse_code = data.warehouse_code;
            if (data.location_code) updateFields.location_code = data.location_code;

            const [updatedProduct] = await tx.update(productInform)
                .set(updateFields)
                .where(eq(productInform.id, id))
                .returning();

            if (data.quantity !== undefined) {
                await tx.update(productQuantity)
                    .set({ quantity: data.quantity, updated_at: new Date() })
                    .where(eq(productQuantity.product_id, id));
            }

            return updatedProduct;
        });
    }

    async delete(id: number) {
        return await db.transaction(async (tx) => {
            // productQuantity should be deleted via cascade if set up, 
            // but let's be explicit if not sure, though I added onDelete: 'cascade'
            await tx.delete(productQuantity).where(eq(productQuantity.product_id, id));
            const [deleted] = await tx.delete(productInform).where(eq(productInform.id, id)).returning();
            return deleted;
        });
    }
}

export default ProductDAO;
