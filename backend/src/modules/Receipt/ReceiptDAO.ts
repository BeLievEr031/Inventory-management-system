import { eq, and } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { receipts, receiptProduct } from "../../db/schemas/receiptSchema.ts";
import { productQuantity } from "../../db/schemas/productSchema.ts";
import type { ICreateReceiptRequest, IUpdateReceiptRequest } from "./ReceiptInterface.ts";

class ReceiptDAO {
    async create(userId: number, data: ICreateReceiptRequest) {
        return await db.transaction(async (tx) => {
            const totalQuantity = data.products.reduce((sum, p) => sum + p.quantity, 0);

            const [newReceipt] = await tx.insert(receipts).values({
                supplier_name: data.supplier_name,
                schedule_date: data.schedule_date,
                total_quantity: totalQuantity,
                responsible_user: userId,
                status: "Draft",
            }).returning();

            if (!newReceipt) throw new Error("Failed to create receipt");

            for (const product of data.products) {
                await tx.insert(receiptProduct).values({
                    receipt_id: newReceipt.id,
                    product_id: product.product_id,
                    quantity: product.quantity,
                    warehouse_code: product.warehouse_code,
                    location_code: product.location_code,
                });
            }

            return newReceipt;
        });
    }

    async getAll(userId: number) {
        return await db.select().from(receipts).where(eq(receipts.responsible_user, userId));
    }

    async getById(id: number, userId: number) {
        const [receipt] = await db.select().from(receipts).where(and(eq(receipts.id, id), eq(receipts.responsible_user, userId)));
        if (!receipt) return null;

        const products = await db.select().from(receiptProduct).where(eq(receiptProduct.receipt_id, id));
        return { ...receipt, products };
    }

    async updateStatus(id: number, status: "Draft" | "Ready" | "Done") {
        return await db.transaction(async (tx) => {
            const [updated] = await tx.update(receipts)
                .set({ status, updated_at: new Date() })
                .where(eq(receipts.id, id))
                .returning();

            if (status === "Done") {
                const products = await tx.select().from(receiptProduct).where(eq(receiptProduct.receipt_id, id));
                for (const p of products) {
                    await tx.execute(`
                        INSERT INTO product_quantity (product_id, quantity, updated_at)
                        VALUES (${p.product_id}, ${p.quantity}, NOW())
                        ON CONFLICT (product_id) DO UPDATE
                        SET quantity = product_quantity.quantity + ${p.quantity}, updated_at = NOW()
                    `);
                    // Note: If using drizzle standard insert/update:
                    /*
                    const [existing] = await tx.select().from(productQuantity).where(eq(productQuantity.product_id, p.product_id));
                    if (existing) {
                        await tx.update(productQuantity)
                            .set({ quantity: existing.quantity + p.quantity, updated_at: new Date() })
                            .where(eq(productQuantity.product_id, p.product_id));
                    } else {
                        await tx.insert(productQuantity).values({
                            product_id: p.product_id,
                            quantity: p.quantity
                        });
                    }
                    */
                }
            }

            return updated;
        });
    }
}

export default ReceiptDAO;
