import express from 'express';
import { auth } from "../middleware/auth.js";
import { getCustomerLedgers, getCustomerPayments } from '../controllers/customerLedgerController.js';
const customerLedgerRouter = express.Router();

customerLedgerRouter.get('/', auth, getCustomerLedgers);
customerLedgerRouter.get('/payments', auth, getCustomerPayments);

export default customerLedgerRouter;