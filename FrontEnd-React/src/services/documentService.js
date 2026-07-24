import documentApi from "../api/documentApi";

export const documentService = {
    async fetchSalesOrders() {
        try {
            const url = `/sales-orders`;
            const response = await documentApi.get(url);
            return response.data;
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
            return response.data;
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
}