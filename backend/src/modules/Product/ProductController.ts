import type { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import ProductService from "./ProductService.ts";
import type { AuthRequest } from "../../middlewares/authMiddleware.ts";

class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async createProduct(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const userId = req.user.id;
            const result = await this.productService.createProduct(userId, req.body);
            return res.status(201).json({ message: "Product created successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user.id;
            const result = await this.productService.getAllProducts(userId);
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) throw createHttpError(400, "Invalid ID format");

            const userId = req.user.id;
            const result = await this.productService.getProductById(id, userId);
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const id = parseInt(req.params.id as string);
            if (isNaN(id)) throw createHttpError(400, "Invalid ID format");

            const userId = req.user.id;
            const result = await this.productService.updateProduct(id, userId, req.body);
            return res.status(200).json({ message: "Product updated successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) throw createHttpError(400, "Invalid ID format");

            const userId = req.user.id;
            const result = await this.productService.deleteProduct(id, userId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;
