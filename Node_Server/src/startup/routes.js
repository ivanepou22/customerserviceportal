import express from 'express';
import { error } from '../middleware/error.js';
import HomeRouter from '../routes/homeRoute.js';
import orderRouter from '../routes/orderRoutes.js';
import userRouter from '../routes/userRoutes.js';
import authRouter from '../routes/authRoutes.js';

export function routes(app) {
    app.use(express.json());
    app.use('/api/v1', HomeRouter);
    app.use('/api/v1/orders', orderRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/auth', authRouter);
    app.use(error);
}