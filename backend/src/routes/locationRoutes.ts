import { Router } from "express";
import LocationController from "../modules/Location/LocationController.ts";
import { createLocationValidation, updateLocationValidation } from "../modules/Location/LocationValidator.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const locationRouter = Router();
const locationController = new LocationController();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location management within warehouses
 */

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
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
 *               - warehouse_code
 *               - name
 *               - code
 *             properties:
 *               warehouse_code:
 *                 type: string
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Warehouse not found or access denied
 *       409:
 *         description: Location code already exists
 */
locationRouter.post(
    "/locations", 
    authMiddleware, 
    createLocationValidation, 
    locationController.createLocation.bind(locationController)
);

/**
 * @swagger
 * /warehouses/{warehouseCode}/locations:
 *   get:
 *     summary: Get all locations for a specific warehouse
 *     tags: [Locations]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: warehouseCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Warehouse Code
 *     responses:
 *       200:
 *         description: List of locations
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Warehouse not found or access denied
 */
locationRouter.get(
    "/warehouses/:warehouseCode/locations", 
    authMiddleware, 
    locationController.getLocationsByWarehouse.bind(locationController)
);

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get a specific location by ID
 *     tags: [Locations]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied to this location
 *       404:
 *         description: Location not found
 */
locationRouter.get(
    "/locations/:id", 
    authMiddleware, 
    locationController.getLocationById.bind(locationController)
);

/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     summary: Update a specific location
 *     tags: [Locations]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Location ID
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
 *         description: Location updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied to this location
 *       404:
 *         description: Location not found
 *       409:
 *         description: Location code already exists
 */
locationRouter.put(
    "/locations/:id", 
    authMiddleware, 
    updateLocationValidation, 
    locationController.updateLocation.bind(locationController)
);

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Locations]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied to this location
 *       404:
 *         description: Location not found
 */
locationRouter.delete(
    "/locations/:id", 
    authMiddleware, 
    locationController.deleteLocation.bind(locationController)
);

export default locationRouter;
