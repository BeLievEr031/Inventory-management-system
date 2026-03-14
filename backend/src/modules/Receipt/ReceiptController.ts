import type { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import ReceiptService from "./ReceiptService.ts";
import type { AuthRequest } from "../../middlewares/authMiddleware.ts";

class ReceiptController {
    private receiptService: ReceiptService;

    constructor() {
        this.receiptService = new ReceiptService();
    }

    async createReceipt(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw createHttpError(400, "Validation Error", { details: errors.array() });
            }

            const userId = req.user.id;
            const result = await this.receiptService.createReceipt(userId, req.body);
            return res.status(201).json({ message: "Receipt created successfully", data: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllReceipts(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user.id;
            const result = await this.receiptService.getAllReceipts(userId);
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async getReceiptById(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) throw createHttpError(400, "Invalid ID format");

            const userId = req.user.id;
            const result = await this.receiptService.getReceiptById(id, userId);
            return res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async validateReceipt(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) throw createHttpError(400, "Invalid ID format");

            const userId = req.user.id;
            const result = await this.receiptService.validateReceipt(id, userId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default ReceiptController;
