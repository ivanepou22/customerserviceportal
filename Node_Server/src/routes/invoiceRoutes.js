import express from "express";
import { auth } from "../middleware/auth.js";
import { getInvoice, getInvoices } from "../controllers/documentController.js";
const invoiceRouter = express.Router();

invoiceRouter.get('/', auth, getInvoices);
invoiceRouter.get('/:documentId', auth, getInvoice);

export default invoiceRouter;