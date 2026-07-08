import express from 'express';
import { error } from '../middleware/error.js';
import HomeRouter from '../routes/homeRoute.js';
import orderRouter from '../routes/orderRoutes.js';
import userRouter from '../routes/userRoutes.js';
import authRouter from '../routes/authRoutes.js';
import invoiceRouter from '../routes/invoiceRoutes.js';
import quoteRouter from '../routes/quoteRoutes.js';
import creditMemoRouter from '../routes/creditmemoRoutes.js';

export function routes(app) {
    app.use(express.json());
    app.use('/api/v1', HomeRouter);
    app.use('/api/v1/orders', orderRouter);
    app.use('/api/v1/invoices', invoiceRouter);
    app.use('/api/v1/quotes', quoteRouter);
    app.use('/api/v1/credit-memos', creditMemoRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/auth', authRouter);
    app.use(error);
}