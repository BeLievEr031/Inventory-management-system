import { Router } from "express";
import DeliveryController from "../modules/Delivery/DeliveryController.ts";
import { createDeliveryValidation } from "../modules/Delivery/DeliveryValidator.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const deliveryRouter = Router();
const deliveryController = new DeliveryController();

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: Management of outgoing goods (Deliveries)
 */

/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: Create a new delivery order (Outgoing goods)
 *     tags: [Deliveries]
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
 *               - reference
 *               - delivery_address
 *               - schedule_date
 *               - products
 *             properties:
 *               reference:
 *                 type: string
 *               delivery_address:
 *                 type: string
 *               contact_name:
 *                 type: string
 *               schedule_date:
 *                 type: string
 *                 format: date
 *               operation_type:
 *                 type: string
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
 *         description: Delivery order created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
deliveryRouter.post(
    "/deliveries",
    authMiddleware,
    createDeliveryValidation,
    deliveryController.createDelivery.bind(deliveryController)
);

/**
 * @swagger
 * /deliveries:
 *   get:
 *     summary: Get all delivery orders for the authenticated user
 *     tags: [Deliveries]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of delivery orders
 *       401:
 *         description: Unauthorized
 */
deliveryRouter.get(
    "/deliveries",
    authMiddleware,
    deliveryController.getAllDeliveries.bind(deliveryController)
);

/**
 * @swagger
 * /deliveries/{id}:
 *   get:
 *     summary: Get a specific delivery order by ID with its products
 *     tags: [Deliveries]
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
 *         description: Delivery order details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery order not found
 */
deliveryRouter.get(
    "/deliveries/:id",
    authMiddleware,
    deliveryController.getDeliveryById.bind(deliveryController)
);

/**
 * @swagger
 * /deliveries/{id}/validate:
 *   post:
 *     summary: Validate a delivery order (Draft -> Waiting -> Ready -> Done)
 *     description: Moving a delivery order to "Done" status will automatically decrease the stock quantities and verify availability.
 *     tags: [Deliveries]
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
 *         description: Delivery order validated and status updated
 *       400:
 *         description: Insufficient stock or other client error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery order not found
 */
deliveryRouter.post(
    "/deliveries/:id/validate",
    authMiddleware,
    deliveryController.validateDelivery.bind(deliveryController)
);

export default deliveryRouter;
