import express from 'express';
import { error } from '../middleware/error.js';
import HomeRouter from '../routes/homeRoute.js';

export function routes(app) {
    app.use(express.json());
    app.use('/api/v1/', HomeRouter);
    app.use(error);
}