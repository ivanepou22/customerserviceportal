import express from "express";
import { auth } from "../middleware/auth.js";
import { getARAging, getCustomer, getCustomerDetailedTrialBalance, getCustomerPaymentReceipt, getCustomerStatement } from "../controllers/customerReportController.js";

const customerReportRouter = express.Router();

customerReportRouter.post('/detailed-trialbalance', auth, getCustomerDetailedTrialBalance);
customerReportRouter.post('/statement', auth, getCustomerStatement);
customerReportRouter.post('/aging', auth, getARAging);
customerReportRouter.get('/customer', auth, getCustomer);
customerReportRouter.post('/receipt', getCustomerPaymentReceipt);
export default customerReportRouter;