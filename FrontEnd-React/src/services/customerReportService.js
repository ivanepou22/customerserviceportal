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
            console.error("Aging Report fetch error:", err);
            throw err;
        }
    }
};
