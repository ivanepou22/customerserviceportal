import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import winston from "winston";
import { routes } from "./src/startup/routes.js";
import { logging } from "./src/startup/logging.js";

dotenv.config();
const app = express();
app.use(helmet());

logging();
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    winston.info(`Server is running on port ${PORT}`);
});