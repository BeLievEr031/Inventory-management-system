import ProductDAO from "./ProductDAO.ts";
import WarehouseDAO from "../Warehouse/WarehouseDAO.ts";
import LocationDAO from "../Location/LocationDAO.ts";
import type { ICreateProductRequest, IUpdateProductRequest } from "./ProductInterface.ts";
import createHttpError from "http-errors";

class ProductService {
    private productDAO: ProductDAO;
    private warehouseDAO: WarehouseDAO;
    private locationDAO: LocationDAO;

    constructor() {
        this.productDAO = new ProductDAO();
        this.warehouseDAO = new WarehouseDAO();
        this.locationDAO = new LocationDAO();
    }

    async createProduct(userId: number, data: ICreateProductRequest) {
        // 1. Check if SKU already exists
        const existingProduct = await this.productDAO.getBySKU(data.sku);
        if (existingProduct) {
            throw createHttpError(409, "A product with this SKU already exists");
        }

        // 2. Verify warehouse exists and belongs to user
        const warehouse = await this.warehouseDAO.getByCodeOrName(data.warehouse_code, "");
        if (!warehouse || warehouse.user_id !== userId) {
            throw createHttpError(404, "Warehouse not found or access denied");
        }

        // 3. Verify location exists and belongs to that warehouse
        const location = await this.locationDAO.getByCode(data.location_code);
        if (!location || location.warehouse_code !== data.warehouse_code) {
             throw createHttpError(404, "Location not found in this warehouse");
        }

        const newProduct = await this.productDAO.create(userId, data);
        if (!newProduct) {
            throw createHttpError(500, "Failed to create product");
        }

        return newProduct;
    }

    async getAllProducts(userId: number) {
        return await this.productDAO.getAll(userId);
    }

    async getProductById(id: number, userId: number) {
        const product = await this.productDAO.getById(id, userId);
        if (!product) {
            throw createHttpError(404, "Product not found");
        }
        return product;
    }

    async updateProduct(id: number, userId: number, data: IUpdateProductRequest) {
        // Check ownership
        const existing = await this.getProductById(id, userId);

        if (data.sku && data.sku !== existing.sku) {
            const collision = await this.productDAO.getBySKU(data.sku);
            if (collision) {
                throw createHttpError(409, "A product with this SKU already exists");
            }
        }

        if (data.warehouse_code) {
            const warehouse = await this.warehouseDAO.getByCodeOrName(data.warehouse_code, "");
            if (!warehouse || warehouse.user_id !== userId) {
                throw createHttpError(404, "Warehouse not found or access denied");
            }
        }

        if (data.location_code) {
            const warehouseCode = data.warehouse_code || existing.warehouse_code;
            const location = await this.locationDAO.getByCode(data.location_code);
            if (!location || location.warehouse_code !== warehouseCode) {
                 throw createHttpError(404, "Location not found in the specified warehouse");
            }
        }

        const updated = await this.productDAO.update(id, data);
        if (!updated) {
            throw createHttpError(500, "Failed to update product");
        }
        return updated;
    }

    async deleteProduct(id: number, userId: number) {
        await this.getProductById(id, userId);
        const deleted = await this.productDAO.delete(id);
        if (!deleted) {
            throw createHttpError(500, "Failed to delete product");
        }
        return { message: "Product deleted successfully" };
    }
}

export default ProductService;
