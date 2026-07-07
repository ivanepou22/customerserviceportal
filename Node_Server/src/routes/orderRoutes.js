import express from "express";
import { getOrder, getOrders } from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.get('/', getOrders);
orderRouter.get('/:orderId', getOrder);

export default orderRouter;