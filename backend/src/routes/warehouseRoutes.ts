import { Router } from "express";
import WarehouseController from "../modules/Warehouse/WarehouseController.ts";
import { createWarehouseValidation, updateWarehouseValidation } from "../modules/Warehouse/WarehouseValidator.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const warehouseRouter = Router();
const warehouseController = new WarehouseController();

/**
 * @swagger
 * tags:
 *   name: Warehouses
 *   description: Warehouse management and inventory
 */

/**
 * @swagger
 * /warehouses:
 *   post:
 *     summary: Create a new warehouse
 *     tags: [Warehouses]
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
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Warehouse name or code already exists
 */
warehouseRouter.post(
    "/warehouses", 
    authMiddleware, 
    createWarehouseValidation, 
    warehouseController.createWarehouse.bind(warehouseController)
);

/**
 * @swagger
 * /warehouses:
 *   get:
 *     summary: Get all warehouses for the authenticated user
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of warehouses
 *       401:
 *         description: Unauthorized
 */
warehouseRouter.get(
    "/warehouses", 
    authMiddleware, 
    warehouseController.getAllWarehouses.bind(warehouseController)
);

/**
 * @swagger
 * /warehouses/{id}:
 *   get:
 *     summary: Get a specific warehouse by ID
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warehouse ID
 *     responses:
 *       200:
 *         description: Warehouse details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Warehouse not found or access denied
 */
warehouseRouter.get(
    "/warehouses/:id", 
    authMiddleware, 
    warehouseController.getWarehouseById.bind(warehouseController)
);

/**
 * @swagger
 * /warehouses/{id}:
 *   put:
 *     summary: Update a specific warehouse
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warehouse ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Warehouse not found
 *       409:
 *         description: Warehouse name or code already exists
 */
warehouseRouter.put(
    "/warehouses/:id", 
    authMiddleware, 
    updateWarehouseValidation, 
    warehouseController.updateWarehouse.bind(warehouseController)
);

/**
 * @swagger
 * /warehouses/{id}:
 *   delete:
 *     summary: Delete a warehouse
 *     tags: [Warehouses]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Warehouse ID
 *     responses:
 *       200:
 *         description: Warehouse deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Warehouse not found
 */
warehouseRouter.delete(
    "/warehouses/:id", 
    authMiddleware, 
    warehouseController.deleteWarehouse.bind(warehouseController)
);

export default warehouseRouter;
