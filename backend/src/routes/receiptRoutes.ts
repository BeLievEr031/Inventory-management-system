import { Router } from "express";
import ReceiptController from "../modules/Receipt/ReceiptController.ts";
import { createReceiptValidation } from "../modules/Receipt/ReceiptValidator.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const receiptRouter = Router();
const receiptController = new ReceiptController();

/**
 * @swagger
 * tags:
 *   name: Receipts
 *   description: Management of incoming goods (Receipts)
 */

/**
 * @swagger
 * /receipts:
 *   post:
 *     summary: Create a new receipt (Incoming goods)
 *     tags: [Receipts]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplier_name
 *               - schedule_date
 *               - products
 *             properties:
 *               supplier_name:
 *                 type: string
 *               schedule_date:
 *                 type: string
 *                 format: date
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     warehouse_code:
 *                       type: string
 *                     location_code:
 *                       type: string
 *     responses:
 *       201:
 *         description: Receipt created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
receiptRouter.post(
    "/receipts",
    authMiddleware,
    createReceiptValidation,
    receiptController.createReceipt.bind(receiptController)
);

/**
 * @swagger
 * /receipts:
 *   get:
 *     summary: Get all receipts for the authenticated user
 *     tags: [Receipts]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of receipts
 *       401:
 *         description: Unauthorized
 */
receiptRouter.get(
    "/receipts",
    authMiddleware,
    receiptController.getAllReceipts.bind(receiptController)
);

/**
 * @swagger
 * /receipts/{id}:
 *   get:
 *     summary: Get a specific receipt by ID with its products
 *     tags: [Receipts]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Receipt details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receipt not found
 */
receiptRouter.get(
    "/receipts/:id",
    authMiddleware,
    receiptController.getReceiptById.bind(receiptController)
);

/**
 * @swagger
 * /receipts/{id}/validate:
 *   post:
 *     summary: Validate a receipt (Draft -> Ready -> Done)
 *     description: Moving a receipt to "Done" status will automatically increase the stock quantities of the included products.
 *     tags: [Receipts]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Receipt validated and status updated
 *       400:
 *         description: Already validated or other client error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receipt not found
 */
receiptRouter.post(
    "/receipts/:id/validate",
    authMiddleware,
    receiptController.validateReceipt.bind(receiptController)
);

export default receiptRouter;
