import express from 'express';
import { error } from '../middleware/error.js';
import HomeRouter from '../routes/homeRoute.js';
import orderRouter from '../routes/orderRoutes.js';
import userRouter from '../routes/userRoutes.js';
import authRouter from '../routes/authRoutes.js';
import invoiceRouter from '../routes/invoiceRoutes.js';
import quoteRouter from '../routes/quoteRoutes.js';
import creditMemoRouter from '../routes/creditmemoRoutes.js';
import postedSalesInvoiceRouter from '../routes/postedSalesInvoiceRoutes.js';
import postedSalesCreditMemoRouter from '../routes/postedSalesCreditMemoRoutes.js';
import customerLedgerRouter from '../routes/customerLedgerRoutes.js';
import pdfRouter from '../routes/pdfRoutes.js';
import customerReportRouter from '../routes/customerReportRoutes.js';
import customerReceiptRouter from '../routes/verifyReceiptRoutes.js';

export function routes(app) {
    app.use(express.json());
    app.use('/api/v1', HomeRouter);
    app.use('/api/v1/sales-orders', orderRouter);
    app.use('/api/v1/sales-invoices', invoiceRouter);
    app.use('/api/v1/sales-quotes', quoteRouter);
    app.use('/api/v1/sales-credit-memos', creditMemoRouter);
    app.use('/api/v1/posted-sales-invoices', postedSalesInvoiceRouter);
    app.use('/api/v1/posted-sales-credit-memos', postedSalesCreditMemoRouter);
    app.use('/api/v1/customer-ledgers', customerLedgerRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/pdf', pdfRouter);
    app.use('/api/v1/customer-reports', customerReportRouter);
    app.use('/api/v1/receipt', customerReceiptRouter);
    app.use(error);
}