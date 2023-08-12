import express from "express";
// @ts-ignore
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "../config/swagger";

// Routes
import mediaRoutes from "./media/media.routes";

const router = express.Router();

router.use("/media", mediaRoutes);

// swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export default router;
