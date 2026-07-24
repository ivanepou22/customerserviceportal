import documentApi from "../api/documentApi";

export const documentService = {
    async fetchSalesOrders() {
        try {
            const url = `/sales-orders`;
            const response = await documentApi.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Sales Orders error:", err);
            throw err;
        }
    },
    async fetchSalesOrder(orderNo) {
        try {
            const url = `/sales-orders/${orderNo}`;
            const response = await documentApi.get(url);
            return response.data;
        } catch (err) {
            console.error("Sales Order error:", err);
            throw err;
        }
    },
    async fetchSalesInvoices() {
        try {
            const url = `/sales-invoices`;
            const response = await documentApi.get(url, {});
            return response.data.value;
        } catch (err) {
            console.error("Sales Invoices error:", err);
            throw err;
        }
    },
    async fetchSalesInvoice(invoiceNo) {
        try {
            const url = `/sales-invoices/${invoiceNo}`;
            const response = await documentApi.get(url);
            return response.data;
        } catch (err) {
            console.error("Sales Invoice error:", err);
            throw err;
        }
    },
    async fetchSalesQuotes() {
        try {
            const url = `/sales-quotes`;
            const response = await documentApi.get(url, {});
            return response.data.value;
        } catch (err) {
            console.error("Sales Quotes error:", err);
            throw err;
        }
    },
    async fetchSalesQuote(quoteNo) {
        try {
            const url = `/sales-quotes/${quoteNo}`;
            const response = await documentApi.get(url);
            return response.data;
        } catch (err) {
            console.error("Sales Quote error:", err);
            throw err;
        }
    },
    async fetchSalesCreditmemos() {
        try {
            const url = `/sales-credit-memos`;
            const response = await documentApi.get(url, {});
            return response.data.value;
        } catch (err) {
            console.error("Sales Creditmemos error:", err);
            throw err;
        }
    },
    async fetchSalesCreditmemo(memoNo) {
        try {
            const url = `/sales-credit-memos/${memoNo}`;
            const response = await documentApi.get(url);
            return response.data;
        } catch (err) {
            console.error("Sales Creditmemo error:", err);
            throw err;
        }
    },
}