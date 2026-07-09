import express from 'express';
import { auth } from "../middleware/auth.js";
import { getPostedSalesInvoice, getPostedSalesInvoices } from '../controllers/postedDocumentController.js';
const postedSalesInvoiceRouter = express.Router();

postedSalesInvoiceRouter.get('/', auth, getPostedSalesInvoices);
postedSalesInvoiceRouter.get('/:documentId', auth, getPostedSalesInvoice);

export default postedSalesInvoiceRouter;