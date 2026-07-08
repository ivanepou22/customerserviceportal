import express from "express";
import { auth } from "../middleware/auth.js";
import { getOrder, getOrders } from "../controllers/documentController.js";
const orderRouter = express.Router();

orderRouter.get('/', auth, getOrders);
orderRouter.get('/:orderId', auth, getOrder);

export default orderRouter;