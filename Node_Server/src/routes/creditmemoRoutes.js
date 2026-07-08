import express from "express";
import { auth } from "../middleware/auth.js";
import { getCreditMemo, getCreditMemos } from "../controllers/documentController.js";
const creditMemoRouter = express.Router();

creditMemoRouter.get('/', auth, getCreditMemos);
creditMemoRouter.get('/:documentId', auth, getCreditMemo);

export default creditMemoRouter;