import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";
import { addPaginationToUrl, createPaginatedResponse, getPagination } from "../startup/pagination.js";
dotenv.config();

const getDocumentFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const documentId = req.params.documentId;
        const url = `${process.env.BASE_URL}/${endpoint}('${documentId}','${customerId}')?$filter=sellToCustomerNo eq '${customerId}'&$expand=saleslines`;
        const response = await axios.get(url, connectBC);
        const document = response.data;

        res.send(document);
    });

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

export const getOrders = getDocumentsFromEndpoint(process.env.BC_ORDERS);
export const getInvoices = getDocumentsFromEndpoint(process.env.BC_INVOICES);
export const getCreditMemos = getDocumentsFromEndpoint(process.env.BC_CREDIT_MEMOS);
export const getQuotes = getDocumentsFromEndpoint(process.env.BC_QUOTES);

export const getOrder = getDocumentFromEndpoint(process.env.BC_ORDERS);
export const getInvoice = getDocumentFromEndpoint(process.env.BC_INVOICES);
export const getCreditMemo = getDocumentFromEndpoint(process.env.BC_CREDIT_MEMOS);
export const getQuote = getDocumentFromEndpoint(process.env.BC_QUOTES);

