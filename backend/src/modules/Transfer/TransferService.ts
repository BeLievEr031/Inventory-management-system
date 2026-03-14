import TransferDAO from "./TransferDAO.ts";
import ProductDAO from "../Product/ProductDAO.ts";
import WarehouseDAO from "../Warehouse/WarehouseDAO.ts";
import LocationDAO from "../Location/LocationDAO.ts";
import type { ICreateTransferRequest } from "./TransferInterface.ts";
import createHttpError from "http-errors";
import { db } from "../../db/index.ts";
import { productQuantity } from "../../db/schemas/productSchema.ts";
import { eq } from "drizzle-orm";

class TransferService {
    private transferDAO: TransferDAO;
    private productDAO: ProductDAO;
    private warehouseDAO: WarehouseDAO;
    private locationDAO: LocationDAO;

    constructor() {
        this.transferDAO = new TransferDAO();
        this.productDAO = new ProductDAO();
        this.warehouseDAO = new WarehouseDAO();
        this.locationDAO = new LocationDAO();
    }

    async createTransfer(userId: number, data: ICreateTransferRequest) {
        // 1. Validate warehouses and locations
        const sourceWh = await this.warehouseDAO.getByCodeOrName(data.source_warehouse_code, "");
        if (!sourceWh) throw createHttpError(404, `Source warehouse ${data.source_warehouse_code} not found`);

        const sourceLoc = await this.locationDAO.getByCode(data.source_location_code);
        if (!sourceLoc || sourceLoc.warehouse_code !== data.source_warehouse_code) {
            throw createHttpError(404, `Source location ${data.source_location_code} not found in warehouse ${data.source_warehouse_code}`);
        }

        const destWh = await this.warehouseDAO.getByCodeOrName(data.destination_warehouse_code, "");
        if (!destWh) throw createHttpError(404, `Destination warehouse ${data.destination_warehouse_code} not found`);

        const destLoc = await this.locationDAO.getByCode(data.destination_location_code);
        if (!destLoc || destLoc.warehouse_code !== data.destination_warehouse_code) {
            throw createHttpError(404, `Destination location ${data.destination_location_code} not found in warehouse ${data.destination_warehouse_code}`);
        }

        // 2. Validate products
        for (const p of data.products) {
            const product = await this.productDAO.getById(p.product_id, userId);
            if (!product) throw createHttpError(404, `Product ID ${p.product_id} not found`);
            
            if (product.warehouse_code !== data.source_warehouse_code || product.location_code !== data.source_location_code) {
                throw createHttpError(400, `Product ${product.sku} is not in source location ${data.source_location_code}`);
            }
        }

        const newTransfer = await this.transferDAO.create(userId, data);
        if (!newTransfer) throw createHttpError(500, "Failed to create transfer");

        return newTransfer;
    }

    async getAllTransfers(userId: number) {
        return await this.transferDAO.getAll(userId);
    }

    async getTransferById(id: number, userId: number) {
        const transfer = await this.transferDAO.getById(id, userId);
        if (!transfer) throw createHttpError(404, "Transfer not found");
        return transfer;
    }

    async validateTransfer(id: number, userId: number) {
        const transfer = await this.getTransferById(id, userId);
        
        if (transfer.status === "Done") {
            throw createHttpError(400, "Transfer is already validated");
        }

        // Check stock availability
        for (const p of transfer.products) {
            const [stock] = await db.select().from(productQuantity).where(eq(productQuantity.product_id, p.product_id));
            if (!stock || stock.quantity < p.quantity) {
                throw createHttpError(400, `Insufficient stock for product ID ${p.product_id}. Available: ${stock?.quantity || 0}, Requested: ${p.quantity}`);
            }
        }

        const updated = await this.transferDAO.updateStatus(id, "Done");
        if (!updated) throw createHttpError(500, "Failed to validate transfer");

        return { message: "Transfer completed successfully", data: updated };
    }
}

export default TransferService;
