import express from "express";
import { auth } from "../middleware/auth.js";
import { getCreditMemoPdf, getInvoicePdf, getOrderPdf, getPostedSalesCreditMemoPdf, getPostedSalesInvoicePdf, getQuotePdf } from "../controllers/pdfController.js";

const pdfRouter = express.Router();

pdfRouter.post('/sales-quotes/:documentId', auth, getQuotePdf);
pdfRouter.post('/sales-orders/:documentId', auth, getOrderPdf);
pdfRouter.post('/sales-invoices/:documentId', auth, getInvoicePdf);
pdfRouter.post('/sales-credit-memos/:documentId', auth, getCreditMemoPdf);
pdfRouter.post('/posted-sales-invoices/:documentId', auth, getPostedSalesInvoicePdf);
pdfRouter.post('/posted-sales-credit-memos/:documentId', auth, getPostedSalesCreditMemoPdf);

export default pdfRouter;