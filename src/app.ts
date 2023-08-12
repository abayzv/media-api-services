import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import dotenv from "dotenv";

import router from "./api";

dotenv.config();

const app: express.Application = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({
    message: "Wellcome to Mahesadev Media API Services",
    docs: "/api/v1/api-docs",
  });
});

// app.use(activityLogger);

app.use("/api/v1", router);

export default app;
