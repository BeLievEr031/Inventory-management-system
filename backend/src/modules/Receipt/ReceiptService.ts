import ReceiptDAO from "./ReceiptDAO.ts";
import ProductDAO from "../Product/ProductDAO.ts";
import WarehouseDAO from "../Warehouse/WarehouseDAO.ts";
import LocationDAO from "../Location/LocationDAO.ts";
import type { ICreateReceiptRequest } from "./ReceiptInterface.ts";
import createHttpError from "http-errors";

class ReceiptService {
    private receiptDAO: ReceiptDAO;
    private productDAO: ProductDAO;
    private warehouseDAO: WarehouseDAO;
    private locationDAO: LocationDAO;

    constructor() {
        this.receiptDAO = new ReceiptDAO();
        this.productDAO = new ProductDAO();
        this.warehouseDAO = new WarehouseDAO();
        this.locationDAO = new LocationDAO();
    }

    async createReceipt(userId: number, data: ICreateReceiptRequest) {
        // 1. Validate all products and their locations
        for (const product of data.products) {
            const productExists = await this.productDAO.getById(product.product_id, userId);
            if (!productExists) {
                throw createHttpError(404, `Product ${product.product_id} not found`);
            }

            const warehouse = await this.warehouseDAO.getByCodeOrName(product.warehouse_code, "");
            if (!warehouse) {
                throw createHttpError(404, `Warehouse ${product.warehouse_code} not found`);
            }

            const location = await this.locationDAO.getByCode(product.location_code);
            if (!location || location.warehouse_code !== product.warehouse_code) {
                throw createHttpError(404, `Location ${product.location_code} not found in warehouse ${product.warehouse_code}`);
            }
        }

        const newReceipt = await this.receiptDAO.create(userId, data);
        if (!newReceipt) {
            throw createHttpError(500, "Failed to create receipt");
        }

        return newReceipt;
    }

    async getAllReceipts(userId: number) {
        return await this.receiptDAO.getAll(userId);
    }

    async getReceiptById(id: number, userId: number) {
        const receipt = await this.receiptDAO.getById(id, userId);
        if (!receipt) {
            throw createHttpError(404, "Receipt not found");
        }
        return receipt;
    }

    async validateReceipt(id: number, userId: number) {
        const receipt = await this.getReceiptById(id, userId);
        
        if (receipt.status === "Done") {
            throw createHttpError(400, "Receipt is already validated");
        }

        // Move status Draft -> Ready -> Done
        let nextStatus: "Ready" | "Done" = "Ready";
        if (receipt.status === "Ready") {
            nextStatus = "Done";
        }

        const updated = await this.receiptDAO.updateStatus(id, nextStatus);
        if (!updated) {
            throw createHttpError(500, "Failed to update receipt status");
        }

        return { message: `Receipt moved to ${nextStatus}`, data: updated };
    }
}

export default ReceiptService;
