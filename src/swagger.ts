import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Umurava Challenge API Documentation",
      version: "1.0.0",
      description: "API documentation generated for the Umurava Challenge",
    },
    servers: [
      {
        url: "https://umurava-challenge-backend-jta5.onrender.com", // Replace with your deployed backend
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // 👈 path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs available at /api-docs");
};
