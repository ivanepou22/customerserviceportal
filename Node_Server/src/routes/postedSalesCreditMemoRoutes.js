import express from 'express';
import { auth } from "../middleware/auth.js";
import { getPostedSalesCreditMemo, getPostedSalesCreditMemos } from '../controllers/postedDocumentController.js';

const postedSalesCreditMemoRouter = express.Router();

postedSalesCreditMemoRouter.get('/', auth, getPostedSalesCreditMemos);
postedSalesCreditMemoRouter.get('/:documentId', auth, getPostedSalesCreditMemo);

export default postedSalesCreditMemoRouter;