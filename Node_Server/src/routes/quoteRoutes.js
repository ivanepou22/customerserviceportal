import express from "express";
import { auth } from "../middleware/auth.js";
import { getQuote, getQuotes } from "../controllers/documentController.js";
const quoteRouter = express.Router();

quoteRouter.get('/', auth, getQuotes);
quoteRouter.get('/:documentId', auth, getQuote);

export default quoteRouter;