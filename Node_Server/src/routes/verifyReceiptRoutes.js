import express from "express";
import { auth } from "../middleware/auth.js";
import { getCustomerPaymentReceipt } from "../controllers/customerReportController.js";

const customerReceiptRouter = express.Router();
customerReceiptRouter.post('/', getCustomerPaymentReceipt);
export default customerReceiptRouter;