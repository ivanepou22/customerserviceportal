import axios from "axios";
import dotenv from "dotenv";
import { asyncMiddleware } from "../middleware/async.js";
import { connectBC } from "../config/connectBC.js";
dotenv.config();

const getCustomerReport = (reportFunction) =>
    asyncMiddleware(async (req, res) => {
        const customerNo = req.user?.customerNo;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const asOfDate = req.query.asOfDate;

        if (!customerNo)
            return res.status(400).json({ message: "Missing required parameters" });

        const actionUrl = `${process.env.BASE_URL}/${process.env.BC_CUSTOMER_REPORT}('${customerNo}')/Microsoft.NAV.${reportFunction}`;

        let payload = {};
        if (reportFunction === "getARAging") {
            if (!asOfDate)
                return res.status(400).json({ message: "Missing required parameters" });
            payload = {
                customerNo,
                asOfDate
            };
        } else {
            if (!startDate || !endDate)
                return res.status(400).json({ message: "Missing required parameters" });
            payload = {
                customerNo,
                startDate,
                endDate
            };
        }

        try {
            const response = await axios.post(actionUrl, payload, connectBC);
            const base64Pdf = response.data.value || response.data;

            if (!base64Pdf)
                return res.status(404).json({ message: "Report not generated" });

            const pdfBuffer = Buffer.from(base64Pdf, 'base64');
            const filename = `${reportFunction.replace('Get', '')}-${customerNo}.pdf`;

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(pdfBuffer);

        } catch (error) {
            res.status(error.response?.status || 500).json({
                message: "Failed to generate PDF",
                details: error.response?.data?.error?.message || error.message
            });
        }
    });

const getCustomerReceipt = (reportFunction) =>
    asyncMiddleware(async (req, res) => {
        const customerNo = req.query.customerNo;
        const entryNo = req.query.entryNo;

        if (!customerNo)
            return res.status(400).json({ message: "Missing required parameters" });

        if (!entryNo)
            return res.status(400).json({ message: "Missing required parameters" })

        const actionUrl = `${process.env.BASE_URL}/${process.env.BC_CUSTOMER_PAYMENTS}('${customerNo}')/Microsoft.NAV.${reportFunction}`;

        const payload = {
            customerNo,
            entryNo
        };

        try {
            const response = await axios.post(actionUrl, payload, connectBC);
            const base64Pdf = response.data.value || response.data;

            if (!base64Pdf)
                return res.status(404).json({ message: "Report not generated" });

            const pdfBuffer = Buffer.from(base64Pdf, 'base64');
            const filename = `${reportFunction.replace('Get', '')}-${customerNo}.pdf`;

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(pdfBuffer);

        } catch (error) {
            res.status(error.response?.status || 500).json({
                message: "Failed to generate PDF",
                details: error.response?.data?.error?.message || error.message
            });
        }
    });

export const getCustomerDetailedTrialBalance = getCustomerReport("getCustomerDetailedTrialBalance");
export const getCustomerStatement = getCustomerReport("getCustomerStatement");
export const getARAging = getCustomerReport("getARAging");
export const getCustomerPaymentReceipt = getCustomerReceipt("generateReceipt")