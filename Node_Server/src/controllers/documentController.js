import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";
dotenv.config();

const getDocumentFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const orderId = req.params.orderId;
        const url = `${process.env.BASE_URL}/${endpoint}('${orderId}')?$filter=sellToCustomerNo eq '${customerId}'&$expand=saleslines`;
        const response = await axios.get(url, connectBC);
        const order = response.data;
        res.send(order);
    });

const getDocumentsFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const url = `${process.env.BASE_URL}/${endpoint}?$filter=sellToCustomerNo eq '${customerId}'`;
        const response = await axios.get(url, connectBC);
        const orders = response.data;
        res.send(orders);
    });

export const getOrders = getDocumentsFromEndpoint(process.env.BC_ORDERS);
export const getInvoices = getDocumentsFromEndpoint(process.env.BC_INVOICES);
export const getCreditMemos = getDocumentsFromEndpoint(process.env.BC_CREDIT_MEMOS);
export const getQuotes = getDocumentsFromEndpoint(process.env.BC_QUOTES);

export const getOrder = getDocumentFromEndpoint(process.env.BC_ORDERS);
export const getInvoice = getDocumentFromEndpoint(process.env.BC_INVOICES);
export const getCreditMemo = getDocumentFromEndpoint(process.env.BC_CREDIT_MEMOS);
export const getQuote = getDocumentFromEndpoint(process.env.BC_QUOTES);

