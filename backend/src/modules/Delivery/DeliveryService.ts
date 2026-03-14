import DeliveryDAO from "./DeliveryDAO.ts";
import ProductDAO from "../Product/ProductDAO.ts";
import WarehouseDAO from "../Warehouse/WarehouseDAO.ts";
import LocationDAO from "../Location/LocationDAO.ts";
import type { ICreateDeliveryRequest } from "./DeliveryInterface.ts";
import createHttpError from "http-errors";
import { db } from "../../db/index.ts";
import { productQuantity } from "../../db/schemas/productSchema.ts";
import { eq } from "drizzle-orm";

class DeliveryService {
    private deliveryDAO: DeliveryDAO;
    private productDAO: ProductDAO;
    private warehouseDAO: WarehouseDAO;
    private locationDAO: LocationDAO;

    constructor() {
        this.deliveryDAO = new DeliveryDAO();
        this.productDAO = new ProductDAO();
        this.warehouseDAO = new WarehouseDAO();
        this.locationDAO = new LocationDAO();
    }

    async createDelivery(userId: number, data: ICreateDeliveryRequest) {
        // Validation logic
        for (const product of data.products) {
            const productExists = await this.productDAO.getById(product.product_id, userId);
            if (!productExists) {
                throw createHttpError(404, `Product ${product.product_id} not found`);
            }

            // Check if sufficient stock exists before even creating the 'Draft' if we want to be strict,
            // or we could check it during validation. Let's check it during validation phase.
        }

        const newDelivery = await this.deliveryDAO.create(userId, data);
        if (!newDelivery) {
            throw createHttpError(500, "Failed to create delivery order");
        }

        return newDelivery;
    }

    async getAllDeliveries(userId: number) {
        return await this.deliveryDAO.getAll(userId);
    }

    async getDeliveryById(id: number, userId: number) {
        const delivery = await this.deliveryDAO.getById(id, userId);
        if (!delivery) {
            throw createHttpError(404, "Delivery order not found");
        }
        return delivery;
    }

    async validateDelivery(id: number, userId: number) {
        const delivery = await this.getDeliveryById(id, userId);
        
        if (delivery.status === "Done") {
            throw createHttpError(400, "Delivery order is already validated");
        }

        // Logic to move through states: Draft -> Waiting -> Ready -> Done
        let nextStatus: "Draft" | "Waiting" | "Ready" | "Done";
        switch (delivery.status) {
            case "Draft": nextStatus = "Waiting"; break;
            case "Waiting": nextStatus = "Ready"; break;
            case "Ready": nextStatus = "Done"; break;
            default: nextStatus = "Done";
        }

        if (nextStatus === "Done") {
            // CRITICAL: Final check for stock availability before reducing
            for (const p of delivery.products) {
                const [stock] = await db.select().from(productQuantity).where(eq(productQuantity.product_id, p.product_id));
                if (!stock || stock.quantity < p.quantity) {
                    throw createHttpError(400, `Insufficient stock for product ID ${p.product_id}. Available: ${stock?.quantity || 0}, Requested: ${p.quantity}`);
                }
            }
        }

        const updated = await this.deliveryDAO.updateStatus(id, nextStatus);
        if (!updated) {
            throw createHttpError(500, "Failed to update delivery status");
        }

        return { message: `Delivery order moved to ${nextStatus}`, data: updated };
    }
}

export default DeliveryService;
