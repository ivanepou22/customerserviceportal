import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";
dotenv.config();

const getDocumentPdfAction = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const documentId = req.params.documentId;

        const actionUrl = `${process.env.BASE_URL}/${endpoint}('${documentId}')/Microsoft.NAV.getPdfBase64`;

        const response = await axios.post(actionUrl, {}, connectBC);

        const base64Pdf = response.data.value ||
            response.data.GetPdfBase64 ||
            response.data;

        if (!base64Pdf)
            return res.status(404).json({ message: "PDF not available" });

        const pdfBuffer = Buffer.from(base64Pdf, 'base64');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${endpoint}-${documentId}.pdf"`);
        res.send(pdfBuffer);
    });

const getPostedDocumentPdfAction = endpoint =>
    asyncMiddleware(async (req, res) => {
        const customerId = req.user.customerNo;
        const documentId = req.params.documentId;

        const actionUrl = `${process.env.BASE_URL}/${endpoint}('${documentId}')/Microsoft.NAV.getPdfBase64`;

        const response = await axios.post(actionUrl, {}, connectBC);

        const base64Pdf = response.data.value ||
            response.data.GetPdfBase64 ||
            response.data;

        if (!base64Pdf)
            return res.status(404).json({ message: "PDF not available" });

        const pdfBuffer = Buffer.from(base64Pdf, 'base64');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${endpoint}-${documentId}.pdf"`);
        res.send(pdfBuffer);
    });

export const getQuotePdf = getDocumentPdfAction(process.env.BC_QUOTES);
export const getOrderPdf = getDocumentPdfAction(process.env.BC_ORDERS);
export const getInvoicePdf = getDocumentPdfAction(process.env.BC_INVOICES);
export const getCreditMemoPdf = getDocumentPdfAction(process.env.BC_CREDIT_MEMOS);
export const getPostedSalesInvoicePdf = getPostedDocumentPdfAction(process.env.BC_POSTED_INVOICES);
export const getPostedSalesCreditMemoPdf = getPostedDocumentPdfAction(process.env.BC_POSTED_CREDIT_MEMOS);