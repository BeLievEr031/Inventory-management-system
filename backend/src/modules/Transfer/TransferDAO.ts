import { eq, and } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { transfers, transferProduct } from "../../db/schemas/transferSchema.ts";
import { productQuantity, productInform } from "../../db/schemas/productSchema.ts";
import type { ICreateTransferRequest } from "./TransferInterface.ts";

class TransferDAO {
    async create(userId: number, data: ICreateTransferRequest) {
        return await db.transaction(async (tx) => {
            const [newTransfer] = await tx.insert(transfers).values({
                reference: data.reference,
                source_warehouse_code: data.source_warehouse_code,
                source_location_code: data.source_location_code,
                destination_warehouse_code: data.destination_warehouse_code,
                destination_location_code: data.destination_location_code,
                schedule_date: data.schedule_date,
                responsible_user: userId,
                status: "Draft",
            }).returning();

            if (!newTransfer) throw new Error("Failed to create transfer");

            for (const p of data.products) {
                await tx.insert(transferProduct).values({
                    transfer_id: newTransfer.id,
                    product_id: p.product_id,
                    quantity: p.quantity,
                });
            }

            return newTransfer;
        });
    }

    async getAll(userId: number) {
        return await db.select().from(transfers).where(eq(transfers.responsible_user, userId));
    }

    async getById(id: number, userId: number) {
        const [transfer] = await db.select().from(transfers).where(and(eq(transfers.id, id), eq(transfers.responsible_user, userId)));
        if (!transfer) return null;

        const products = await db.select().from(transferProduct).where(eq(transferProduct.transfer_id, id));
        return { ...transfer, products };
    }

    async updateStatus(id: number, status: "Draft" | "Done") {
        return await db.transaction(async (tx) => {
            const [updated] = await tx.update(transfers)
                .set({ status, updated_at: new Date() })
                .where(eq(transfers.id, id))
                .returning();

            if (status === "Done") {
                const products = await tx.select().from(transferProduct).where(eq(transferProduct.transfer_id, id));
                const transferInfo = await tx.select().from(transfers).where(eq(transfers.id, id)).limit(1);
                
                if (!transferInfo[0]) throw new Error("Transfer record not found");

                for (const p of products) {
                    const [sourceProduct] = await tx.select().from(productInform).where(eq(productInform.id, p.product_id)).limit(1);

                    // 1. Decrease stock from source
                    await tx.execute(`
                        UPDATE product_quantity 
                        SET quantity = quantity - ${p.quantity}, updated_at = NOW()
                        WHERE product_id = ${p.product_id}
                    `);

                    // 2. Increase stock in destination
                    // Since we support multiple locations for same SKU, we need to find or create the product record in the destination location.
                    // Actually, the user's requirement is to transfer stock. If the SKU doesn't exist in destination, we create it.
                    
                if (!sourceProduct) throw new Error(`Source product ${p.product_id} details not found`);
                
                // Find if same SKU exists in destination location
                const [destProduct] = await tx.select()
                    .from(productInform)
                    .where(and(
                        eq(productInform.sku, sourceProduct.sku),
                        eq(productInform.warehouse_code, transferInfo[0].destination_warehouse_code),
                        eq(productInform.location_code, transferInfo[0].destination_location_code),
                        eq(productInform.user_id, sourceProduct.user_id)
                    ))
                    .limit(1);

                let destId: number;
                if (destProduct) {
                    destId = destProduct.id;
                } else {
                    // Create product info in new location
                    const [newProd] = await tx.insert(productInform).values({
                        name: sourceProduct.name,
                        sku: sourceProduct.sku,
                        category: sourceProduct.category,
                        warehouse_code: transferInfo[0].destination_warehouse_code,
                        location_code: transferInfo[0].destination_location_code,
                        user_id: sourceProduct.user_id
                    }).returning();
                    
                    if (!newProd) throw new Error("Failed to replicate product in destination");
                    destId = newProd.id;
                }

                    // Update or Insert quantity for destination
                    await tx.execute(`
                        INSERT INTO product_quantity (product_id, quantity, updated_at)
                        VALUES (${destId}, ${p.quantity}, NOW())
                        ON CONFLICT (product_id) DO UPDATE
                        SET quantity = product_quantity.quantity + ${p.quantity}, updated_at = NOW()
                    `);
                }
            }

            return updated;
        });
    }
}

export default TransferDAO;
