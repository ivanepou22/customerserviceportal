import express from 'express';
import { auth } from "../middleware/auth.js";
import { getCustomerCreditMemos, getCustomerInvoices, getCustomerLedgers, getCustomerPayments, getCustomerRefunds } from '../controllers/customerLedgerController.js';
const customerLedgerRouter = express.Router();

customerLedgerRouter.get('/', auth, getCustomerLedgers);
customerLedgerRouter.get('/payments', auth, getCustomerPayments);
customerLedgerRouter.get('/refunds', auth, getCustomerRefunds);
customerLedgerRouter.get('/invoices', auth, getCustomerInvoices);
customerLedgerRouter.get('/credit-memos', auth, getCustomerCreditMemos);

export default customerLedgerRouter;