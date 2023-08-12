import express from "express";
// @ts-ignore
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "../config/swagger";

const router = express.Router();

// Swagger setup

// swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export default router;
