import express from 'express';
import { authenticate, refresh } from '../controllers/authController.js';

const authRouter = express.Router();
authRouter.post('/', authenticate);
authRouter.post('/refresh', refresh);

export default authRouter;