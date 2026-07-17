import express from "express";
import { auth } from "../middleware/auth.js";
import { getARAging, getCustomerDetailedTrialBalance, getCustomerStatement } from "../controllers/customerReportController.js";

const customerReportRouter = express.Router();

customerReportRouter.post('/detailed-trialbalance', auth, getCustomerDetailedTrialBalance);
customerReportRouter.post('/statement', auth, getCustomerStatement);
customerReportRouter.post('/aging', auth, getARAging);

export default customerReportRouter;