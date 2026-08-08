import publicApi from "../api/publicApi";

export const receiptVerificationService = {
    async fetchReceiptPdf(token) {
        if (!token) {
            throw new Error("Missing token parameter");
        }

        try {
            const url = `/receipt/${token}`;
            const response = await publicApi.post(url, { token });
            return response.data;
        } catch (err) {
            console.error("Receipt fetch error:", err);
            throw err;
        }
    }
};