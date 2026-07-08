import express from 'express';
import { authenticate } from '../controllers/authController.js';

const authRouter = express.Router();
authRouter.post('/', authenticate);

export default authRouter;