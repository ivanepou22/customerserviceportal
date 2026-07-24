import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import winston from "winston";
import cors from 'cors';
import { routes } from "./src/startup/routes.js";
import { logging } from "./src/startup/logging.js";

dotenv.config();
const app = express();
app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

logging();
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    winston.info(`Server is running on port ${PORT}`);
});