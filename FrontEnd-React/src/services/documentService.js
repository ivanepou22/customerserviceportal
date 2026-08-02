import api from "../api/authApi";

export const documentService = {
    async fetchSalesOrders() {
        try {
            const url = `/sales-orders`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Sales Orders error:", err);
            throw err;
        }
    },
    async fetchSalesOrder(orderNo) {
        try {
            const url = `/sales-orders/${orderNo}`;
            const response = await api.get(url);
            return response.data;
        } catch (err) {
            console.error("Sales Order error:", err);
            throw err;
        }
    },
    async fetchSalesInvoices() {
        try {
            const url = `/sales-invoices`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Sales Invoices error:", err);
            throw err;
        }
    },
    async fetchSalesInvoice(invoiceNo) {
        try {
            const url = `/sales-invoices/${invoiceNo}`;
            const response = await api.get(url);
            return response.data;
        } catch (err) {
            console.error("Sales Invoice error:", err);
            throw err;
        }
    },
    async fetchSalesQuotes() {
        try {
            const url = `/sales-quotes`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Sales Quotes error:", err);
            throw err;
        }
    },
    async fetchSalesQuote(quoteNo) {
        try {
            const url = `/sales-quotes/${quoteNo}`;
            const response = await api.get(url);
            return response.data;
        } catch (err) {
            console.error("Sales Quote error:", err);
            throw err;
        }
    },
    async fetchSalesCreditmemos() {
        try {
            const url = `/sales-credit-memos`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Sales Creditmemos error:", err);
            throw err;
        }
    },
    async fetchSalesCreditmemo(memoNo) {
        try {
            const url = `/sales-credit-memos/${memoNo}`;
            const response = await api.get(url);
            return response.data;
        } catch (err) {
            console.error("Sales Creditmemo error:", err);
            throw err;
        }
    },
    async fetchPostedSalesInvoices() {
        try {
            const url = `/posted-sales-invoices`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Posted Sales Invoices error:", err);
            throw err;
        }
    },
    async fetchPostedSalesInvoice(id) {
        try {
            const url = `/posted-sales-invoices/${id}`;
            const response = await api.get(url);
            return response.data;
        } catch (err) {
            console.error("Posted Sales Invoice error:", err);
            throw err;
        }
    },
    async fetchPostedSalesCreditmemos() {
        try {
            const url = `/posted-sales-credit-memos`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Posted Sales Creditmemos error:", err);
            throw err;
        }
    },
    async fetchPostedSalesCreditmemo(id) {
        try {
            const url = `/posted-sales-credit-memos/${id}`;
            const response = await api.get(url);
            return response.data;
        } catch (err) {
            console.error("Posted Sales Creditmemos error:", err);
            throw err;
        }
    },
    async fetchCustomerPayments() {
        try {
            const url = `/customer-ledgers/payments`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Posted Customer Payments error:", err);
            throw err;
        }
    },
    async fetchCustomerLedgerEntries() {
        try {
            const url = `/customer-ledgers`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Posted Customer Ledger Entries error:", err);
            throw err;
        }
    },
    async fetchCustomerRefunds() {
        try {
            const url = `/customer-ledgers/refunds`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Posted Customer Refund error:", err);
            throw err;
        }
    },
    async fetchCustomerInvoices() {
        try {
            const url = `/customer-ledgers/invoices`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Posted Customer Invoices error:", err);
            throw err;
        }
    },
    async fetchCustomerCreditMemos() {
        try {
            const url = `/customer-ledgers/credit-memos`;
            const response = await api.get(url);
            return response.data.value;
        } catch (err) {
            console.error("Posted Customer Credit Memos error:", err);
            throw err;
        }
    },
}