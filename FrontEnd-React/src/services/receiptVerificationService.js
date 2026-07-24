import publicApi from "../api/publicApi";

export const receiptVerificationService = {
    async fetchReceiptPdf(customerNo, entryNo) {
        if (!customerNo || !entryNo) {
            throw new Error("Missing customerNo or entryNo");
        }

        try {
            const url = `/receipt?customerNo=${customerNo}&entryNo=${entryNo}`;
            const response = await publicApi.post(url, {});
            return response.data;
        } catch (err) {
            console.error("Receipt fetch error:", err);
            throw err;
        }
    }
};