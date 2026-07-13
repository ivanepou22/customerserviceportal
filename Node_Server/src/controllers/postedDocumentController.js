import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";
import { addPaginationToUrl, createPaginatedResponse, getPagination } from "../startup/pagination.js";
dotenv.config();

const getDocumentsFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const pagination = getPagination(req.query);
        if (pagination.error) return res.status(400).json({ message: pagination.error });

        const baseUrl = `${process.env.BASE_URL}/${endpoint}?$filter=sellToCustomerNo eq '${customerId}'`;
        const url = addPaginationToUrl(baseUrl, pagination);
        const response = await axios.get(url, connectBC);
        res.send(createPaginatedResponse(response.data, pagination));
    });

const getDocumentFromEndpoint = (endpoint, expandElement) =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const documentId = req.params.documentId;
        const url = `${process.env.BASE_URL}/${endpoint}('${documentId}')?$filter=sellToCustomerNo eq '${customerId}'&$expand=${expandElement}`;
        const response = await axios.get(url, connectBC);
        const document = response.data;
        res.send(document);
    });

export const getPostedSalesInvoices = getDocumentsFromEndpoint(process.env.BC_POSTED_INVOICES);
export const getPostedSalesInvoice = getDocumentFromEndpoint(process.env.BC_POSTED_INVOICES, 'salesinvoicelines');
export const getPostedSalesCreditMemos = getDocumentsFromEndpoint(process.env.BC_POSTED_CREDIT_MEMOS);
export const getPostedSalesCreditMemo = getDocumentFromEndpoint(process.env.BC_POSTED_CREDIT_MEMOS, 'salescreditmemolines');
