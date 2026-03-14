import { Router } from "express";
import ProductController from "../modules/Product/ProductController.ts";
import { createProductValidation, updateProductValidation } from "../modules/Product/ProductValidator.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const productRouter = Router();
const productController = new ProductController();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product information and inventory management
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *               - sku
 *               - category
 *               - warehouse_code
 *               - location_code
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               category:
 *                 type: string
 *               warehouse_code:
 *                 type: string
 *               location_code:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 default: 0
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: SKU already exists
 */
productRouter.post(
    "/products",
    authMiddleware,
    createProductValidation,
    productController.createProduct.bind(productController)
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products for the authenticated user
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products with inventory quantities
 *       401:
 *         description: Unauthorized
 */
productRouter.get(
    "/products",
    authMiddleware,
    productController.getAllProducts.bind(productController)
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Products]
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
 *         description: Product details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
productRouter.get(
    "/products/:id",
    authMiddleware,
    productController.getProductById.bind(productController)
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a specific product or its quantity
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               category:
 *                 type: string
 *               warehouse_code:
 *                 type: string
 *               location_code:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       409:
 *         description: SKU collision
 */
productRouter.put(
    "/products/:id",
    authMiddleware,
    updateProductValidation,
    productController.updateProduct.bind(productController)
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
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
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
productRouter.delete(
    "/products/:id",
    authMiddleware,
    productController.deleteProduct.bind(productController)
);

export default productRouter;
