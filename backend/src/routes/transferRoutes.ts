import { Router } from "express";
import TransferController from "../modules/Transfer/TransferController.ts";
import { createTransferValidation } from "../modules/Transfer/TransferValidator.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const transferRouter = Router();
const transferController = new TransferController();

/**
 * @swagger
 * tags:
 *   name: Transfers
 *   description: Management of internal stock transfers
 */

transferRouter.post(
    "/transfers",
    authMiddleware,
    createTransferValidation,
    transferController.createTransfer.bind(transferController)
);

transferRouter.get(
    "/transfers",
    authMiddleware,
    transferController.getAllTransfers.bind(transferController)
);

transferRouter.get(
    "/transfers/:id",
    authMiddleware,
    transferController.getTransferById.bind(transferController)
);

transferRouter.post(
    "/transfers/:id/validate",
    authMiddleware,
    transferController.validateTransfer.bind(transferController)
);

export default transferRouter;
