import { Request, Response, NextFunction } from "express";
import TransferService from "./TransferService.ts";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

class TransferController {
    private transferService: TransferService;

    constructor() {
        this.transferService = new TransferService();
    }

    async createTransfer(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(createHttpError(400, "Validation Error", { errors: errors.array() }));
            }

            const userId = (req as any).user.id;
            const result = await this.transferService.createTransfer(userId, req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    async getAllTransfers(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.id;
            const result = await this.transferService.getAllTransfers(userId);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    async getTransferById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.id;
            const result = await this.transferService.getTransferById(parseInt(req.params.id as string), userId);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    async validateTransfer(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.id;
            const result = await this.transferService.validateTransfer(parseInt(req.params.id as string), userId);
            res.status(200).json({ success: true, ...result });
        } catch (error) {
            next(error);
        }
    }
}

export default TransferController;
