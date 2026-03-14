import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Application } from "express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Inventory Management API",
            version: "1.0.0",
            description: "API Documentation for the Inventory Management System including Users, Warehouses, and Locations.",
        },
        servers: [
            {
                url: "http://localhost:5000/api/v1",
                description: "Local Development Server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token here if you are not using HttpOnly cookies.",
                },
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "token",
                    description: "Standard authentication using the strict HttpOnly token cookie.",
                },
            },
        },
        security: [
            {
                cookieAuth: [],
            },
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["src/routes/*.ts"], // Path to the API routes files for scanning comments
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger Docs available at http://localhost:5000/api-docs");
};
