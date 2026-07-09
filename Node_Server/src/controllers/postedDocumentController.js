import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";
dotenv.config();

const getInvoiceDocumentsFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const url = `${process.env.BASE_URL}/${endpoint}?$filter=sellToCustomerNo eq '${customerId}'`;
        const response = await axios.get(url, connectBC);
        const documents = response.data;
        res.send(documents);
    });

const getInvoiceDocumentFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const documentId = req.params.documentId;
        const url = `${process.env.BASE_URL}/${endpoint}('${documentId}')?$filter=sellToCustomerNo eq '${customerId}'&$expand=salesinvoicelines`;
        const response = await axios.get(url, connectBC);
        const document = response.data;
        res.send(document);
    });

const getCreditMemoDocumentsFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const url = `${process.env.BASE_URL}/${endpoint}?$filter=sellToCustomerNo eq '${customerId}'`;
        const response = await axios.get(url, connectBC);
        const documents = response.data;
        res.send(documents);
    });

const getCreditMemoDocumentFromEndpoint = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const documentId = req.params.documentId;
        const url = `${process.env.BASE_URL}/${endpoint}('${documentId}')?$filter=sellToCustomerNo eq '${customerId}'&$expand=salescreditmemolines`;
        const response = await axios.get(url, connectBC);
        const document = response.data;
        res.send(document);
    });


export const getPostedSalesInvoices = getInvoiceDocumentsFromEndpoint(process.env.BC_POSTED_INVOICES);
export const getPostedSalesInvoice = getInvoiceDocumentFromEndpoint(process.env.BC_POSTED_INVOICES);
export const getPostedSalesCreditMemos = getCreditMemoDocumentsFromEndpoint(process.env.BC_POSTED_CREDIT_MEMOS);
export const getPostedSalesCreditMemo = getCreditMemoDocumentFromEndpoint(process.env.BC_POSTED_CREDIT_MEMOS);
