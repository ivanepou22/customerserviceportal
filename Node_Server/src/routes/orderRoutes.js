import express from "express";
const orderRouter = express.Router();
import { getOrder, getOrders } from "../controllers/orderController.js";

orderRouter.get('/', getOrders);
orderRouter.get('/:orderId', getOrder);

export default orderRouter;