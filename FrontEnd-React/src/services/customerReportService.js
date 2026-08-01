import documentApi from "../api/documentApi";

export const customerReportService = {
    async fetchAgingReport(agingAsOfDate) {
        if (!agingAsOfDate) {
            throw new Error("Missing agining aging as of Date");
        }

        try {
            const url = `/customer-reports/aging?asOfDate=${agingAsOfDate}`;
            const response = await documentApi.post(url, {});
            return response.data;
        } catch (err) {
            console.error("Aging Report fetch error:", err);
            throw err;
        }
    },
    async fetchCustomer() {
        try {
            const url = `/customer-reports/customer`;
            const response = await documentApi.get(url);
            return response.data;
        } catch (err) {
            console.error("Customer Report fetch error:", err);
            throw err;
        }
    },
    async fetchSalesOrder(orderNumber) {
        if (!orderNumber) {
            throw new Error("Missing Sales Order Number");
        }
        try {
            const url = `/pdf/sales-orders/${orderNumber}`;
            const response = await documentApi.post(url, {});
            return response.data;
        } catch (err) {
            console.error("Sales Order Report fetch error:", err);
            throw err;
        }
    },
    async fetchSalesInvoice(invoiceNumber) {
        if (!invoiceNumber) {
            throw new Error("Missing Sales Invoice Number");
        }
        try {
            const url = `/pdf/sales-invoices/${invoiceNumber}`;
            const response = await documentApi.post(url, {});
            return response.data;
        } catch (err) {
            console.error("Sales Invoice Report fetch error:", err);
            throw err;
        }
    },
    async fetchSalesQuote(quoteNumber) {
        if (!quoteNumber) {
            throw new Error("Missing Sales Quote Number");
        }
        try {
            const url = `/pdf/sales-quotes/${quoteNumber}`;
            const response = await documentApi.post(url, {});
            return response.data;
        } catch (err) {
            console.error("Sales Quote Report fetch error:", err);
            throw err;
        }
    },
    async fetchSalesCreditMemo(creditMemoNumber) {
        if (!creditMemoNumber) {
            throw new Error("Missing Sales Credit Memo Number");
        }
        try {
            const url = `/pdf/sales-credit-memos/${creditMemoNumber}`;
            const response = await documentApi.post(url, {});
            return response.data;
        } catch (err) {
            console.error("Sales Credit Memo Report fetch error:", err);
            throw err;
        }
    },
    async fetchPostedSalesInvoice(invoiceNumber) {
        if (!invoiceNumber) {
            throw new Error("Missing PostedSales Invoice Number");
        }
        try {
            const url = `/pdf/posted-sales-invoices/${invoiceNumber}`;
            const response = await documentApi.post(url, {});
            return response.data;
        } catch (err) {
            console.error("Posted Sales Invoice Report fetch error:", err);
            throw err;
        }
    },
    async fetchPostedSalesCreditMemo(creditMemoNumber) {
        if (!creditMemoNumber) {
            throw new Error("Missing Posted Sales Credit Memo Number");
        }
        try {
            const url = `/pdf/posted-sales-credit-memos/${creditMemoNumber}`;
            const response = await documentApi.post(url, {});
            return response.data;
        } catch (err) {
            console.error("Posted Sales Credit Memo Report fetch error:", err);
            throw err;
        }
    },
};
